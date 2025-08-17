const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

// Optional Puppeteer import for high-quality rendering
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (error) {
  console.log('⚠️  Puppeteer not available, falling back to Sharp-only mode');
}

/**
 * Converts SVG to PNG with specified dimensions while maintaining aspect ratio
 * @param {string} inputPath - Path to input SVG file
 * @param {string} outputPath - Path for output PNG file
 * @param {number} width - Target width (default: 1200)
 * @param {number} height - Target height (default: 630)
 */
async function svgToPng(inputPath, outputPath, width = 1200, height = 630) {
  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(inputPath);
    
    // Convert SVG to PNG with Sharp using optimized settings
    const pngBuffer = await sharp(svgBuffer)
      .resize({
        width: width,
        height: height,
        fit: 'fill', // Fill entire dimensions without borders
        background: { r: 0, g: 0, b: 0, alpha: 1 }, // Black background
        kernel: 'lanczos3', // Better quality resizing
        withoutEnlargement: false
      })
      .png({
        compressionLevel: 0, // No compression for maximum quality
        adaptiveFiltering: false,
        palette: false, // Disable palette for better color accuracy
        quality: 100
      })
      .toBuffer();
    
    // Write the PNG file
    await fs.writeFile(outputPath, pngBuffer);
    
    console.log(`✅ Successfully converted ${inputPath} to ${outputPath}`);
    console.log(`📏 Output dimensions: ${width}x${height}px with black background (no borders)`);
    
  } catch (error) {
    console.error('❌ Error converting SVG to PNG:', error.message);
    throw error;
  }
}

/**
 * Alternative conversion method using higher quality settings
 * @param {string} inputPath - Path to input SVG file
 * @param {string} outputPath - Path for output PNG file
 * @param {number} width - Target width
 * @param {number} height - Target height
 */
async function svgToPngHighQuality(inputPath, outputPath, width = 1200, height = 630) {
  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(inputPath);
    
    // Use higher density for better text rendering
    const density = Math.max(300, Math.ceil(Math.max(width, height) / 4));
    
    const pngBuffer = await sharp(svgBuffer, { density })
      .resize({
        width: width,
        height: height,
        fit: 'fill', // Fill entire dimensions without borders
        background: { r: 0, g: 0, b: 0, alpha: 1 },
        kernel: 'lanczos3'
      })
      .png({
        compressionLevel: 0,
        adaptiveFiltering: false,
        palette: false,
        quality: 100
      })
      .toBuffer();
    
    await fs.writeFile(outputPath, pngBuffer);
    
    console.log(`✅ Successfully converted ${inputPath} to ${outputPath} (High Quality)`);
    console.log(`📏 Output dimensions: ${width}x${height}px with ${density} DPI`);
    
  } catch (error) {
    console.error('❌ Error in high-quality conversion:', error.message);
    throw error;
  }
}

/**
 * Converts SVG to PNG using Puppeteer for superior rendering quality
 * @param {string} inputPath - Path to input SVG file
 * @param {string} outputPath - Path for output PNG file
 * @param {number} width - Target width
 * @param {number} height - Target height
 */
async function svgToPngPuppeteer(inputPath, outputPath, width = 1200, height = 630) {
  if (!puppeteer) {
    throw new Error('Puppeteer is not available. Install it with: npm install puppeteer');
  }

  try {
    // Read the SVG file
    const svgContent = await fs.readFile(inputPath, 'utf8');
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    
    // Create HTML with the SVG embedded
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #000;
              width: 100vw;
              height: 100vh;
              overflow: hidden;
            }
            svg {
              width: 100%;
              height: 100%;
              display: block;
            }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `;
    
    // Set content and wait for rendering
    await page.setContent(html);
    
    // Wait a bit for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: false
    });
    
    await browser.close();
    
    // Write the PNG file
    await fs.writeFile(outputPath, screenshot);
    
    console.log(`✅ Successfully converted ${inputPath} to ${outputPath} (Puppeteer)`);
    console.log(`📏 Output dimensions: ${width}x${height}px with 2x device scale factor`);
    
  } catch (error) {
    console.error('❌ Error in Puppeteer conversion:', error.message);
    throw error;
  }
}

/**
 * Batch convert multiple SVG files
 * @param {string} inputDir - Directory containing SVG files
 * @param {string} outputDir - Directory for PNG outputs
 * @param {number} width - Target width
 * @param {number} height - Target height
 * @param {string} method - Conversion method: 'sharp', 'high-quality', or 'puppeteer'
 */
async function batchConvert(inputDir, outputDir, width = 1200, height = 630, method = 'sharp') {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Read all files in input directory
    const files = await fs.readdir(inputDir);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
    
    if (svgFiles.length === 0) {
      console.log('No SVG files found in the input directory.');
      return;
    }
    
    console.log(`Found ${svgFiles.length} SVG file(s) to convert using ${method} method...`);
    
    // Convert each SVG file
    for (const svgFile of svgFiles) {
      const inputPath = path.join(inputDir, svgFile);
      const outputFile = path.basename(svgFile, '.svg') + '.png';
      const outputPath = path.join(outputDir, outputFile);
      
      switch (method) {
        case 'puppeteer':
          await svgToPngPuppeteer(inputPath, outputPath, width, height);
          break;
        case 'high-quality':
          await svgToPngHighQuality(inputPath, outputPath, width, height);
          break;
        default:
          await svgToPng(inputPath, outputPath, width, height);
      }
    }
    
    console.log(`🎉 Batch conversion complete! Converted ${svgFiles.length} files using ${method} method.`);
    
  } catch (error) {
    console.error('❌ Error in batch conversion:', error.message);
    throw error;
  }
}

// Main function to handle command line arguments
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node svg-to-png.js <input-svg-file> [output-png-file] [width] [height] [--method]');
    console.log('Methods: --sharp (default), --high-quality, --puppeteer');
    console.log('Example: node svg-to-png.js ./static/img/gh-stats-social-card.svg');
    console.log('Example: node svg-to-png.js ./static/img/gh-stats-social-card.svg --puppeteer');
    console.log('Example: node svg-to-png.js ./static/img/gh-stats-social-card.svg --high-quality');
    return;
  }
  
  const inputPath = args[0];
  const outputPath = args[1] || inputPath.replace('.svg', '.png');
  const width = parseInt(args[2]) || 1200;
  const height = parseInt(args[3]) || 630;
  
  // Determine conversion method
  let method = 'sharp'; // default
  if (args.includes('--puppeteer')) {
    method = 'puppeteer';
  } else if (args.includes('--high-quality')) {
    method = 'high-quality';
  }
  
  try {
    switch (method) {
      case 'puppeteer':
        await svgToPngPuppeteer(inputPath, outputPath, width, height);
        break;
      case 'high-quality':
        await svgToPngHighQuality(inputPath, outputPath, width, height);
        break;
      default:
        await svgToPng(inputPath, outputPath, width, height);
    }
  } catch (error) {
    console.error('Failed to convert SVG:', error.message);
    process.exit(1);
  }
}

// Export functions for use as module
module.exports = { svgToPng, svgToPngHighQuality, svgToPngPuppeteer, batchConvert };

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}