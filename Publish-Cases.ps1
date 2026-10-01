[CmdletBinding()]
param([switch]$LocalOnly)
$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath $PSScriptRoot
function Invoke-Checked([string]$Command, [string[]]$Arguments) {
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) { throw "步骤失败：$Command $($Arguments -join ' ')" }
}
try {
    foreach ($toolName in @('node','npm','git','gh')) { if (-not (Get-Command $toolName -ErrorAction SilentlyContinue)) { throw "缺少工具：$toolName" } }
    if (-not (Test-Path -LiteralPath 'node_modules')) { Invoke-Checked 'npm' @('ci') }
    Invoke-Checked 'npm' @('run','check')
    Invoke-Checked 'npm' @('run','build')
    if ($LocalOnly) { Write-Host '本地检查与构建通过，可运行 npm run preview。'; return }
    Invoke-Checked 'git' @('add','--all')
    Invoke-Checked 'git' @('add','--force','--','cases')
    Invoke-Checked 'npm' @('run','check','--','--tracked')
    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) { Write-Host '没有待发布的改动。'; return }
    Invoke-Checked 'git' @('commit','-m','Update verified gallery cases')
    Invoke-Checked 'git' @('push')
    $publishSha = (& git rev-parse HEAD).Trim()
    Write-Host "已推送 $publishSha；检查自动部署。"
    $runId = $null
    for ($attempt = 0; $attempt -lt 12; $attempt++) {
        $runs = & gh run list --workflow deploy.yml --commit $publishSha --limit 1 --json databaseId | ConvertFrom-Json
        if ($runs.Count -gt 0) { $runId = $runs[0].databaseId; break }
        Start-Sleep -Seconds 5
    }
    if (-not $runId) { throw '没有找到自动发布记录；到 GitHub Actions 查看。' }
    Invoke-Checked 'gh' @('run','watch',"$runId",'--exit-status','--interval','10')
    Invoke-Checked 'node' @('scripts/verify-cloud.mjs','--commit',$publishSha)
    Invoke-Checked 'node' @('scripts/clean-work.mjs')
    Write-Host '发布与云端文件校验完成：https://vincejan.github.io/ai-case-gallery/'
    Write-Host '原测试目录未删除；公网画面和操作确认后再按用户要求清理。'
} finally { Pop-Location }
