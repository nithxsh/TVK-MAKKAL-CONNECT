param(
  [string]$Root = (Join-Path $PSScriptRoot 'dist'),
  [int]$Port = 4173
)

$listener = [System.Net.HttpListener]::new()
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Serving $Root at $prefix"

$contentTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.webp' = 'image/webp'
  '.json' = 'application/json; charset=utf-8'
  '.map'  = 'application/json; charset=utf-8'
  '.ico'  = 'image/x-icon'
}

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
  } catch {
    break
  }

  $req = $context.Request
  $res = $context.Response

  $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
  if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }

  $relativePath = $path -replace '/', '\'
  $filePath = Join-Path $Root $relativePath

  Write-Host "Request: $($req.Url.AbsolutePath) -> $filePath"

  $hasExtension = [System.IO.Path]::GetExtension($relativePath) -ne ''
  if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
    if ($hasExtension) {
      Write-Host "  File not found: $filePath"
      $filePath = $null
    } else {
      $filePath = Join-Path $Root 'index.html'
    }
  }

  try {
    if (-not $filePath) { throw [System.IO.FileNotFoundException]::new() }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $ext = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
    if ($contentTypes.ContainsKey($ext)) { $res.ContentType = $contentTypes[$ext] } else { $res.ContentType = 'application/octet-stream' }
    $res.StatusCode = 200
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    $msg = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
    $res.StatusCode = 404
    $res.ContentType = 'text/plain; charset=utf-8'
    $res.ContentLength64 = $msg.Length
    $res.OutputStream.Write($msg, 0, $msg.Length)
  } finally {
    $res.OutputStream.Close()
  }
}

$listener.Stop()
