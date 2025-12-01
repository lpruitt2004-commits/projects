#!/bin/bash
# Script to generate PWA icons using ImageMagick
# Requires: imagemagick (install with: sudo apt-get install imagemagick)

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Create a simple icon using ImageMagick (Raspberry Pi themed)
# This creates a base 512x512 icon
convert -size 512x512 xc:none \
  -fill "#c51a4a" -draw "circle 256,256 256,100" \
  -fill "white" -font DejaVu-Sans-Bold -pointsize 200 -gravity center -annotate +0+0 "🥧" \
  icons/icon-512x512.png

# Generate all required sizes
sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"; do
    if [ $size -ne 512 ]; then
        convert icons/icon-512x512.png -resize ${size}x${size} icons/icon-${size}x${size}.png
        echo "Generated icon-${size}x${size}.png"
    else
        echo "Using original icon-512x512.png"
    fi
done

echo "All PWA icons generated successfully!"
echo "Icons are located in the icons/ directory"
