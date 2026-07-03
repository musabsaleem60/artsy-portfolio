param(
  [Parameter(Mandatory = $true)]
  [string]$Source
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$galleryDir = Join-Path $projectRoot "public\gallery"
$dataFile = Join-Path $projectRoot "data\images.ts"
$extensions = @(".jpg", ".jpeg", ".png", ".webp", ".avif")

New-Item -ItemType Directory -Force -Path $galleryDir | Out-Null
Get-ChildItem -LiteralPath $galleryDir -File | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -LiteralPath $Source -File -Recurse |
  Where-Object { $extensions -contains $_.Extension.ToLowerInvariant() } |
  Sort-Object FullName

$items = New-Object System.Collections.Generic.List[object]
$index = 1

foreach ($file in $files) {
  $extension = $file.Extension.ToLowerInvariant()
  if ($extension -eq ".jpeg") {
    $extension = ".jpg"
  }

  $fileName = "portfolio-{0:D3}{1}" -f $index, $extension
  $destination = Join-Path $galleryDir $fileName
  Copy-Item -LiteralPath $file.FullName -Destination $destination -Force

  $image = $null
  try {
    $image = [System.Drawing.Image]::FromFile($destination)
    $width = $image.Width
    $height = $image.Height
  }
  finally {
    if ($null -ne $image) {
      $image.Dispose()
    }
  }

  $items.Add([pscustomobject]@{
    Id = $index
    Src = "/gallery/$fileName"
    Alt = "Weds by Artsy portfolio photograph $index"
    Width = $width
    Height = $height
  })

  $index++
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("export type GalleryImage = {")
$lines.Add("  id: number;")
$lines.Add("  src: string;")
$lines.Add("  alt: string;")
$lines.Add("  width: number;")
$lines.Add("  height: number;")
$lines.Add("};")
$lines.Add("")
$lines.Add("export const galleryImages: GalleryImage[] = [")

foreach ($item in $items) {
  $lines.Add("  {")
  $lines.Add("    id: $($item.Id),")
  $lines.Add("    src: `"$($item.Src)`",")
  $lines.Add("    alt: `"$($item.Alt)`",")
  $lines.Add("    width: $($item.Width),")
  $lines.Add("    height: $($item.Height),")
  $lines.Add("  },")
}

$lines.Add("];")
$lines.Add("")

[System.IO.File]::WriteAllLines($dataFile, $lines, [System.Text.UTF8Encoding]::new($false))

Write-Output "Imported $($items.Count) images into $galleryDir"
