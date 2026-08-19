param(
  [Parameter(Mandatory = $true)]
  [string]$Source
)

Add-Type -AssemblyName System.Drawing

$outputDirectory = Join-Path $PSScriptRoot "..\public\icons"
$sizes = @(
  @{ Name = "favicon-16x16.png"; Size = 16 },
  @{ Name = "favicon-32x32.png"; Size = 32 },
  @{ Name = "favicon-48x48.png"; Size = 48 },
  @{ Name = "apple-touch-icon.png"; Size = 180 },
  @{ Name = "icon-192x192.png"; Size = 192 },
  @{ Name = "icon-512x512.png"; Size = 512 }
)

$sourceImage = [System.Drawing.Image]::FromFile($Source)

try {
  foreach ($icon in $sizes) {
    $size = $icon.Size
    $canvas = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)

    try {
      $graphics.Clear([System.Drawing.Color]::Transparent)
      $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      $maximum = [Math]::Floor($size * 0.86)
      $scale = [Math]::Min($maximum / $sourceImage.Width, $maximum / $sourceImage.Height)
      $width = [Math]::Max(1, [Math]::Round($sourceImage.Width * $scale))
      $height = [Math]::Max(1, [Math]::Round($sourceImage.Height * $scale))
      $x = [Math]::Floor(($size - $width) / 2)
      $y = [Math]::Floor(($size - $height) / 2)

      $graphics.DrawImage($sourceImage, $x, $y, $width, $height)
      $destination = Join-Path $outputDirectory $icon.Name
      $canvas.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $graphics.Dispose()
      $canvas.Dispose()
    }
  }
}
finally {
  $sourceImage.Dispose()
}
