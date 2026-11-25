[CmdletBinding()]
param(
    [switch]$LocalOnly,
    [string]$Message = 'Update verified gallery cases',
    [string[]]$VerifyOnlineIds = @(),
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

    Write-Host ''
    Write-Host '发布与云端文件校验完成：https://vincejan.github.io/ai-case-gallery/'
    Write-Host '原作品测试目录未自动删除；请在确认公网画面无误后按需手动清理。'
} finally {
    Pop-Location
}
