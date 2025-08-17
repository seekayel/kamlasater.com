const fs = require('fs/promises');
const path = require('path');

// Puppeteer import for high-quality rendering
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (error) {
  console.error('❌ Puppeteer is required but not available. Install it with: npm install puppeteer');
  process.exit(1);
}

/**
 * Converts SVG to PNG using Puppeteer for superior rendering quality
 * @param {string} inputPath - Path to input SVG file
 * @param {string} outputPath - Path for output PNG file
 * @param {number} width - Target width (default: 1200)
 * @param {number} height - Target height (default: 630)
 */
async function svgToPng(inputPath, outputPath, width = 1200, height = 630) {
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
    
    console.log(`✅ Successfully converted ${inputPath} to ${outputPath}`);
    console.log(`📏 Output dimensions: ${width}x${height}px with 2x device scale factor`);
    
  } catch (error) {
    console.error('❌ Error converting SVG to PNG:', error.message);
    throw error;
  }
}

/**
 * Batch convert multiple SVG files
 * @param {string} inputDir - Directory containing SVG files
 * @param {string} outputDir - Directory for PNG outputs
 * @param {number} width - Target width
 * @param {number} height - Target height
 */
async function batchConvert(inputDir, outputDir, width = 1200, height = 630) {
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
    
    console.log(`Found ${svgFiles.length} SVG file(s) to convert...`);
    
    // Convert each SVG file
    for (const svgFile of svgFiles) {
      const inputPath = path.join(inputDir, svgFile);
      const outputFile = path.basename(svgFile, '.svg') + '.png';
      const outputPath = path.join(outputDir, outputFile);
      
      await svgToPng(inputPath, outputPath, width, height);
    }
    
    console.log(`🎉 Batch conversion complete! Converted ${svgFiles.length} files.`);
    
  } catch (error) {
    console.error('❌ Error in batch conversion:', error.message);
    throw error;
  }
}

// Main function to handle command line arguments
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node svg-to-png.js <input-svg-file> [output-png-file] [width] [height]');
    console.log('Example: node svg-to-png.js ./static/img/gh-stats-social-card.svg');
    console.log('Example: node svg-to-png.js ./static/img/gh-stats-social-card.svg output.png 1200 630');
    return;
  }
  
  const inputPath = args[0];
  const outputPath = args[1] || inputPath.replace('.svg', '.png');
  const width = parseInt(args[2]) || 1200;
  const height = parseInt(args[3]) || 630;
  
  try {
    await svgToPng(inputPath, outputPath, width, height);
  } catch (error) {
    console.error('Failed to convert SVG:', error.message);
    process.exit(1);
  }
}

// Export functions for use as module
module.exports = { svgToPng, batchConvert };

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}