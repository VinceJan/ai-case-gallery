[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string[]]$Path,
    [string]$Model = '',
    [string]$Harness = '',
    [string]$Topic = 'other',
    [string]$Prompt = '',
    [switch]$LocalOnly
)
$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath $PSScriptRoot
try {
    foreach ($toolName in @('node','npm','git','gh')) { if (-not (Get-Command $toolName -ErrorAction SilentlyContinue)) { throw "缺少工具：$toolName" } }
    if (-not (Test-Path -LiteralPath 'node_modules')) { & npm ci; if ($LASTEXITCODE -ne 0) { throw '站点依赖安装失败' } }
    New-Item -ItemType Directory -Path '.work' -Force | Out-Null
    $importedIds = @()
    foreach ($sourcePath in $Path) {
        $resolvedSource = (Resolve-Path -LiteralPath $sourcePath).Path
        if (-not (Get-Item -LiteralPath $resolvedSource).PSIsContainer) { throw '请提供作品文件夹，而不是单个文件' }
        $specPath = Join-Path $PSScriptRoot '.work\new-case.json'
        $taskArgs = @('scripts/make-spec.mjs','--source',$resolvedSource,'--model',$Model,'--harness',$Harness,'--topic',$Topic,'--out',$specPath)
        if ($Prompt) { $taskArgs += @('--prompt',$Prompt) }
        $caseId = & node @taskArgs
        if ($LASTEXITCODE -ne 0) { throw '生成收录记录失败' }
        & npm run import -- --spec $specPath
        if ($LASTEXITCODE -ne 0) { throw '案例收录失败' }
        & npm run rebuild -- $caseId
        if ($LASTEXITCODE -ne 0) { throw '案例构建命令失败' }
        $caseRecord = Get-Content -LiteralPath (Join-Path 'cases' "$caseId\case.json") -Raw -Encoding utf8 | ConvertFrom-Json
        if ($caseRecord.status -eq 'build-failed') { throw "展示构建失败，原材料已收录，请查看 cases/$caseId/case.json" }
        $importedIds += $caseId
    }
    & npm run check
    if ($LASTEXITCODE -ne 0) { throw '文件校验失败' }
    & npm run build
    if ($LASTEXITCODE -ne 0) { throw '站点构建失败' }
    $verifyArgs = @('scripts/verify-new.mjs') + $importedIds
    & node @verifyArgs
    if ($LASTEXITCODE -ne 0) { throw '新案例未通过浏览器展示检查，原目录保留，请查看验证记录' }
    & npm run build
    if ($LASTEXITCODE -ne 0) { throw '更新验证结果后的站点构建失败' }
    if ($LocalOnly) { Write-Host '已完成本地收录。可用 npm run preview 查看，原目录保留。'; return }
    & git add --force -- cases
    if ($LASTEXITCODE -ne 0) { throw 'Git 暂存失败' }
    & npm run check -- --tracked
    if ($LASTEXITCODE -ne 0) { throw '存在未进入 Git 提交的收录文件，暂不发布' }
    & git commit -m ('Add cases: ' + ($importedIds -join ', '))
    if ($LASTEXITCODE -ne 0) { throw 'Git 提交失败' }
    & git push
    if ($LASTEXITCODE -ne 0) { throw '推送失败' }
    $publishSha = (& git rev-parse HEAD).Trim()
    Write-Host '已推送，等待网站自动发布。'
    $runId = $null
    for ($attempt = 0; $attempt -lt 12; $attempt++) {
        $runs = & gh run list --workflow deploy.yml --commit $publishSha --limit 1 --json databaseId | ConvertFrom-Json
        if ($runs.Count -gt 0) { $runId = $runs[0].databaseId; break }
        Start-Sleep -Seconds 5
    }
    if (-not $runId) { throw '没有找到自动发布记录；请到 GitHub Actions 查看，暂不要清理原目录' }
    & gh run watch $runId --exit-status --interval 10
    if ($LASTEXITCODE -ne 0) { throw '网站发布未成功，暂不要清理原目录' }
    & node scripts/verify-cloud.mjs --commit $publishSha
    if ($LASTEXITCODE -ne 0) { throw '云端材料检查未通过，暂不要清理原目录' }
    $cleanArgs = @('scripts/clean-work.mjs') + $importedIds
    & node @cleanArgs
    if ($LASTEXITCODE -ne 0) { throw '发布已完成，但临时依赖清理失败，请查看临时构建目录' }
    Write-Host '发布与云端文件检查完成：https://vincejan.github.io/ai-case-gallery/'
    Write-Host '请打开新案例确认画面和操作。脚本不会自动删除原目录。'
} finally { Pop-Location }
