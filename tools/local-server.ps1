param(
  [int]$Port = 5500,
  [string]$Root = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) {
  $Root = Split-Path -Parent $PSScriptRoot
}
$Root = [System.IO.Path]::GetFullPath($Root)
$prefix = "http://localhost:$Port/"

function Get-ContentType([string]$path) {
  switch ([System.IO.Path]::GetExtension($path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css"  { "text/css; charset=utf-8" }
    ".js"   { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".webp" { "image/webp" }
    ".png"  { "image/png" }
    ".jpg"  { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".svg"  { "image/svg+xml" }
    ".ico"  { "image/x-icon" }
    ".txt"  { "text/plain; charset=utf-8" }
    default { "application/octet-stream" }
  }
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Host ""
  Write-Host "로컬 서버를 시작하지 못했습니다." -ForegroundColor Red
  Write-Host "포트 $Port 가 이미 사용 중인지 확인해 주세요."
  Write-Host $_.Exception.Message
  Read-Host "Enter를 눌러 종료"
  exit 1
}

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host " Word City Detective - Local PWA Server" -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "Root : $Root"
Write-Host "URL  : $prefix"
Write-Host "종료 : 이 창에서 Ctrl+C"
Write-Host ""

Start-Process $prefix

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $requestPath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    $candidate = [System.IO.Path]::GetFullPath((Join-Path $Root $requestPath))

    if (-not $candidate.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
      $context.Response.StatusCode = 403
      $context.Response.Close()
      continue
    }

    if ((Test-Path $candidate) -and (Get-Item $candidate).PSIsContainer) {
      $candidate = Join-Path $candidate "index.html"
    }

    if (-not (Test-Path $candidate)) {
      $candidate = Join-Path $Root "index.html"
    }

    $bytes = [System.IO.File]::ReadAllBytes($candidate)
    $context.Response.StatusCode = 200
    $context.Response.ContentType = Get-ContentType $candidate
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.Headers["Cache-Control"] = "no-cache"
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.OutputStream.Close()
  } catch {
    if ($listener.IsListening) {
      Write-Host "요청 처리 오류: $($_.Exception.Message)" -ForegroundColor DarkYellow
    }
  }
}
