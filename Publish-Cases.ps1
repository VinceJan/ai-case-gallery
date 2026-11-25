[CmdletBinding()]
param(
    [switch]$LocalOnly,
    [string]$PromoteId = '',
    [string]$Review = '',
    [string]$Message = '',
    [string[]]$VerifyOnlineIds = @(),
    [string]$RemoveSource = '',
    [switch]$SkipClean
)

$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath $PSScriptRoot

function Invoke-Checked([string]$Command, [string[]]$Arguments) {
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) { throw "步骤失败：$Command $($Arguments -join ' ')" }
}

try {
    $taskTools = @('node', 'npm', 'git')
    if (-not $LocalOnly) { $taskTools += 'gh' }
    foreach ($toolName in $taskTools) {
        if (-not (Get-Command $toolName -ErrorAction SilentlyContinue)) {
            throw "缺少工具：$toolName"
        }
    }

    if (-not (Test-Path -LiteralPath 'node_modules')) {
        Write-Host '[0/6] 安装画廊依赖...'
        Invoke-Checked 'npm' @('ci')
    }

    # Pre-validate -RemoveSource before doing any work (fail-fast safety guard)
    if ($RemoveSource) {
        if ($LocalOnly) {
            throw '-RemoveSource 只能在云端发布并核验通过后使用，不能与 -LocalOnly 同时使用'
        }
        Invoke-Checked 'node' @('scripts/safe-remove-source.mjs', '--check', $RemoveSource)
    }

    # Optional integrated review + promote step (still enforces fingerprint-bound browser verification!)
    if ($PromoteId) {
        if (-not $Review) {
            throw '使用 -PromoteId 时必须提供 -Review "<实际画面复核说明>"（请先查看 .work/verification/<ID>.png）'
        }
        Write-Host "[0/6] 登记画面复核并转正收录：$PromoteId"
        Invoke-Checked 'node' @('scripts/review-case.mjs', $PromoteId, $Review)
        Invoke-Checked 'node' @('scripts/promote-case.mjs', $PromoteId)

        if (-not $Message) {
            $caseMeta = Get-Content -LiteralPath (Join-Path 'cases' "$PromoteId\case.json") -Raw -Encoding UTF8 | ConvertFrom-Json
            $Message = "Add verified $($caseMeta.topic) case for $($caseMeta.model) on $($caseMeta.harness)"
        }
        if ($VerifyOnlineIds -notcontains $PromoteId) {
            $VerifyOnlineIds += $PromoteId
        }
    }

    if (-not $Message) {
        $Message = 'Update verified gallery cases'
    }

    Write-Host '[1/6] 运行自动化回归测试 (npm test)...'
    Invoke-Checked 'npm' @('test')

    Write-Host '[2/6] 校验全部案例元信息与 SHA-256 指纹 (npm run check)...'
    Invoke-Checked 'npm' @('run', 'check')

    Write-Host '[3/6] 构建静态站点 (npm run build)...'
    Invoke-Checked 'npm' @('run', 'build')

    if ($LocalOnly) {
        Write-Host '本地检查与构建通过，可运行 npm run preview 预览。'
        return
    }

    Write-Host '[4/6] 暂存改动、核验 tracked 指纹并推送到远端...'
    Invoke-Checked 'git' @('add', '--all')
    Invoke-Checked 'git' @('add', '--force', '--', 'cases')
    Invoke-Checked 'npm' @('run', 'check', '--', '--tracked')

    & git diff --cached --quiet
    $taskDiffCode = $LASTEXITCODE
    if ($taskDiffCode -eq 1) {
        Invoke-Checked 'git' @('commit', '--quiet', '-m', $Message)
    } elseif ($taskDiffCode -ne 0) {
        throw '无法检查暂存改动'
    }

    Invoke-Checked 'git' @('push')
    $publishSha = (& git rev-parse HEAD).Trim()
    Write-Host "已推送 $publishSha；等待 GitHub Pages 自动部署..."

    $runId = $null
    for ($attempt = 0; $attempt -lt 12; $attempt++) {
        $runs = & gh run list --workflow deploy.yml --commit $publishSha --limit 1 --json databaseId | ConvertFrom-Json
        if ($runs.Count -gt 0) { $runId = $runs[0].databaseId; break }
        Start-Sleep -Seconds 5
    }
    if (-not $runId) { throw '没有找到自动发布记录；请到 GitHub Actions 查看。' }

    Write-Host "[5/6] 监控部署任务 $runId 并执行云端逐文件指纹核验..."
    Invoke-Checked 'gh' @('run', 'watch', "$runId", '--exit-status', '--interval', '10')
    Invoke-Checked 'node' @('scripts/verify-cloud.mjs', '--commit', $publishSha)

    if ($VerifyOnlineIds.Count -gt 0) {
        $onlineArgs = @('scripts/verify-browser.mjs', '--online', '--url=https://vincejan.github.io/ai-case-gallery/')
        foreach ($id in $VerifyOnlineIds) {
            foreach ($part in ($id -split ',')) {
                $trimmed = $part.Trim()
                if ($trimmed) { $onlineArgs += "--id=$trimmed" }
            }
        }
        Write-Host '正在执行公网在线渲染校验...'
        Invoke-Checked 'node' $onlineArgs
    }

    if (-not $SkipClean) {
        Write-Host '[6/6] 清理本地临时构建产物与缓存（保留 .work/incoming/）...'
        Invoke-Checked 'node' @('scripts/clean-work.mjs', '--all')
    }

    if ($RemoveSource) {
        Write-Host '云端与线上验收全部通过，正在按授权安全删除原测试目录...'
        Invoke-Checked 'node' @('scripts/safe-remove-source.mjs', $RemoveSource)
    }

    Write-Host ''
    Write-Host '发布与云端文件校验完成：https://vincejan.github.io/ai-case-gallery/'
    if ($PromoteId) {
        Write-Host "新作品详情页：https://vincejan.github.io/ai-case-gallery/cases/$PromoteId/"
    }
    if (-not $RemoveSource) {
        Write-Host '原作品测试目录未自动删除；如需清理可在发布时追加 -RemoveSource "<原目录>"。'
    }
} finally {
    Pop-Location
}
