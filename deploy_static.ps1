# deploy_static.ps1 - 100% funcțional
param([switch]$Clean = $false)

Write-Host "=== STATIC FILES DEPLOYMENT ===" -ForegroundColor Cyan

# Clean old files
if ($Clean) {
    Write-Host "Cleaning old files..." -ForegroundColor Yellow
    if (Test-Path "backend\server\static\css") {
        Remove-Item "backend\server\static\css\*" -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path "backend\server\static\js") {
        Remove-Item "backend\server\static\js\*" -Force -ErrorAction SilentlyContinue
    }
}

# Create directories
New-Item -ItemType Directory -Force -Path "backend\server\static\css" | Out-Null
New-Item -ItemType Directory -Force -Path "backend\server\static\js" | Out-Null

# Copy CSS
$cssFiles = Get-ChildItem "frontend\build\static\css\main.*.css" -ErrorAction SilentlyContinue
if ($cssFiles) {
    foreach ($file in $cssFiles) {
        if ($file.Name -like "*.css" -and $file.Name -notlike "*.map") {
            Copy-Item $file.FullName -Destination "backend\server\static\css\" -Force
            $size = [math]::Round($file.Length / 1KB, 2)
            Write-Host "✓ CSS: $($file.Name) ($size KB)" -ForegroundColor Green
        }
    }
} else {
    Write-Host "⚠ No CSS files found" -ForegroundColor Yellow
}

# Copy JS
$jsFiles = Get-ChildItem "frontend\build\static\js\main.*.js" -ErrorAction SilentlyContinue
if ($jsFiles) {
    foreach ($file in $jsFiles) {
        if ($file.Name -like "*.js" -and $file.Name -notlike "*.map" -and $file.Name -notlike "*.LICENSE*") {
            Copy-Item $file.FullName -Destination "backend\server\static\js\" -Force
            $size = [math]::Round($file.Length / 1KB, 2)
            Write-Host "✓ JS:  $($file.Name) ($size KB)" -ForegroundColor Green
        }
    }
} else {
    Write-Host "⚠ No JS files found" -ForegroundColor Yellow
}

# Show result
Write-Host "`n=== RESULT ===" -ForegroundColor Cyan
Write-Host "CSS files:" -ForegroundColor White
Get-ChildItem "backend\server\static\css" -ErrorAction SilentlyContinue | ForEach-Object {
    $size = [math]::Round($_.Length / 1KB, 2)
    Write-Host "  └─ $($_.Name) ($size KB)" -ForegroundColor Gray
}

Write-Host "`nJS files:" -ForegroundColor White
Get-ChildItem "backend\server\static\js" -ErrorAction SilentlyContinue | ForEach-Object {
    $size = [math]::Round($_.Length / 1KB, 2)
    Write-Host "  └─ $($_.Name) ($size KB)" -ForegroundColor Gray
}

Write-Host "`n✅ Done! Static files are ready for Django." -ForegroundColor Green
