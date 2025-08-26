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
 * Parse SVG to extract dimensions from width/height attributes or viewBox
 * @param {string} svgContent - Raw SVG content
 * @returns {Object} Object with width and height properties
 */
function parseSvgDimensions(svgContent) {
  const svgMatch = svgContent.match(/<svg[^>]*>/);
  if (!svgMatch) {
    throw new Error('Invalid SVG: no root <svg> element found');
  }
  
  const svgTag = svgMatch[0];
  
  // Try to get width and height attributes first
  const widthMatch = svgTag.match(/width=["']([^"']+)["']/);
  const heightMatch = svgTag.match(/height=["']([^"']+)["']/);
  
  let width, height;
  
  if (widthMatch && heightMatch) {
    // Remove any non-numeric characters (like 'px', 'em', etc.) and parse
    width = parseFloat(widthMatch[1].replace(/[^\d.-]/g, ''));
    height = parseFloat(heightMatch[1].replace(/[^\d.-]/g, ''));
  }
  
  // If width/height not found or invalid, fallback to viewBox
  if (!width || !height || isNaN(width) || isNaN(height)) {
    const viewBoxMatch = svgTag.match(/viewBox=["']([^"']+)["']/);
    if (viewBoxMatch) {
      const viewBoxParts = viewBoxMatch[1].trim().split(/\s+/);
      if (viewBoxParts.length >= 4) {
        width = parseFloat(viewBoxParts[2]) - parseFloat(viewBoxParts[0]);
        height = parseFloat(viewBoxParts[3]) - parseFloat(viewBoxParts[1]);
      }
    }
  }
  
  if (!width || !height || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    throw new Error(`Could not determine valid SVG dimensions. Found: width=${width}, height=${height}`);
  }
  
  return { width, height };
}

/**
 * Calculate scaling and positioning for aspect-ratio preservation
 * @param {number} inputWidth - Original SVG width
 * @param {number} inputHeight - Original SVG height  
 * @param {number} targetWidth - Target output width
 * @param {number} targetHeight - Target output height
 * @returns {Object} Scaling and positioning parameters
 */
function calculateAspectRatioFit(inputWidth, inputHeight, targetWidth, targetHeight) {
  const inputAspect = inputWidth / inputHeight;
  const targetAspect = targetWidth / targetHeight;
  
  let scaledWidth, scaledHeight, offsetX, offsetY;
  
  if (inputAspect > targetAspect) {
    // Input is wider - letterbox (fit to width, add bars on top/bottom)
    scaledWidth = targetWidth;
    scaledHeight = targetWidth / inputAspect;
    offsetX = 0;
    offsetY = (targetHeight - scaledHeight) / 2;
  } else {
    // Input is taller - pillarbox (fit to height, add bars on left/right)
    scaledWidth = targetHeight * inputAspect;
    scaledHeight = targetHeight;
    offsetX = (targetWidth - scaledWidth) / 2;
    offsetY = 0;
  }
  
  return {
    scaledWidth,
    scaledHeight,
    offsetX,
    offsetY,
    scale: scaledWidth / inputWidth
  };
}

/**
 * Remove border elements from SVG content
 * @param {string} svgContent - SVG content to process
 * @returns {string} SVG content with border elements removed
 */
function removeSvgBorders(svgContent) {
  // Remove rect elements that are commonly used as borders/backgrounds
  // This targets rects with stroke attributes or that span the full dimensions
  let cleanedContent = svgContent;
  
  // Remove rect elements with stroke attributes (likely borders)
  cleanedContent = cleanedContent.replace(/<rect[^>]*stroke[^>]*\/?>|<rect[^>]*stroke[^>]*>[\s\S]*?<\/rect>/gi, '');
  
  // Remove rect elements that are likely card backgrounds/borders
  // Look for rects with data-testid="card-bg" or similar patterns
  cleanedContent = cleanedContent.replace(/<rect[^>]*data-testid=["']card-bg["'][^>]*\/?>|<rect[^>]*data-testid=["']card-bg["'][^>]*>[\s\S]*?<\/rect>/gi, '');
  
  // Remove any remaining rect elements that have both width and height close to 100% or full dimensions
  cleanedContent = cleanedContent.replace(/<rect[^>]*width=["'][^"']*99[^"']*["'][^>]*\/?>|<rect[^>]*width=["'][^"']*99[^"']*["'][^>]*>[\s\S]*?<\/rect>/gi, '');
  
  return cleanedContent;
}

/**
 * Create a wrapper SVG that centers the input SVG content with aspect-ratio preservation
 * @param {string} originalSvgContent - Original SVG content
 * @param {number} targetWidth - Target container width
 * @param {number} targetHeight - Target container height
 * @param {string} backgroundColor - Background color for letterboxing/pillarboxing
 * @returns {string} Wrapped SVG content
 */
function createCenteredSvg(originalSvgContent, targetWidth, targetHeight, backgroundColor = '#000000') {
  const inputDimensions = parseSvgDimensions(originalSvgContent);
  const fit = calculateAspectRatioFit(
    inputDimensions.width,
    inputDimensions.height,
    targetWidth,
    targetHeight
  );
  
  console.log(`📐 Input dimensions: ${inputDimensions.width}x${inputDimensions.height} (aspect: ${(inputDimensions.width/inputDimensions.height).toFixed(2)})`);
  console.log(`📐 Target dimensions: ${targetWidth}x${targetHeight} (aspect: ${(targetWidth/targetHeight).toFixed(2)})`);
  console.log(`📐 Scaled dimensions: ${fit.scaledWidth.toFixed(1)}x${fit.scaledHeight.toFixed(1)} (scale: ${fit.scale.toFixed(3)})`);
  console.log(`📐 Offset: (${fit.offsetX.toFixed(1)}, ${fit.offsetY.toFixed(1)})`);
  
  // Extract the inner content of the original SVG (everything except the root <svg> tag)
  const svgContentMatch = originalSvgContent.match(/<svg[^>]*?>([\s\S]*)<\/svg>/);
  if (!svgContentMatch) {
    throw new Error('Could not extract SVG inner content');
  }
  let innerContent = svgContentMatch[1];
  
  // Remove border elements from the SVG content
  innerContent = removeSvgBorders(innerContent);
  console.log(`🧹 Removed border elements from SVG content`);
  
  // Create the wrapper SVG with centered content
  const wrapperSvg = `<svg
  width="${targetWidth}"
  height="${targetHeight}"
  viewBox="0 0 ${targetWidth} ${targetHeight}"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  <g transform="translate(${fit.offsetX}, ${fit.offsetY}) scale(${fit.scale})">
    <svg
      width="${inputDimensions.width}"
      height="${inputDimensions.height}"
      viewBox="0 0 ${inputDimensions.width} ${inputDimensions.height}"
    >
      ${innerContent}
    </svg>
  </g>
</svg>`;
  
  return wrapperSvg;
}

/**
 * Converts SVG to PNG using Puppeteer with aspect-ratio preservation
 * @param {string} inputPath - Path to input SVG file
 * @param {string} outputPath - Path for output PNG file
 * @param {number} width - Target width (default: 1200)
 * @param {number} height - Target height (default: 630)
 * @param {string} backgroundColor - Background color for letterboxing (default: #000000)
 */
async function svgToPngAspect(inputPath, outputPath, width = 1200, height = 630, backgroundColor = '#000000') {
  try {
    // Read the original SVG file
    const originalSvgContent = await fs.readFile(inputPath, 'utf8');
    
    // Create the centered wrapper SVG
    const centeredSvg = createCenteredSvg(originalSvgContent, width, height, backgroundColor);
    
    // Optionally write the wrapper SVG to a temp file for debugging
    if (process.env.DEBUG_SVG) {
      const tempSvgPath = outputPath.replace('.png', '_wrapper.svg');
      await fs.writeFile(tempSvgPath, centeredSvg);
      console.log(`🐛 Debug: Wrapper SVG written to ${tempSvgPath}`);
    }
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match target dimensions
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    
    // Create HTML with the centered SVG embedded
    const html = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 0;
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
    ${centeredSvg}
  </body>
</html>`;
    
    // Set content and wait for rendering
    await page.setContent(html);
    
    // Wait for any animations to complete
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
    
    console.log(`✅ Successfully converted ${inputPath} to ${outputPath} with aspect-ratio preservation`);
    console.log(`📏 Output dimensions: ${width}x${height}px with 2x device scale factor`);
    
  } catch (error) {
    console.error('❌ Error converting SVG to PNG:', error.message);
    throw error;
  }
}

/**
 * Batch convert multiple SVG files with aspect-ratio preservation
 * @param {string} inputDir - Directory containing SVG files
 * @param {string} outputDir - Directory for PNG outputs
 * @param {number} width - Target width
 * @param {number} height - Target height
 * @param {string} backgroundColor - Background color for letterboxing
 */
async function batchConvertAspect(inputDir, outputDir, width = 1200, height = 630, backgroundColor = '#000000') {
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
    
    console.log(`Found ${svgFiles.length} SVG file(s) to convert with aspect-ratio preservation...`);
    
    // Convert each SVG file
    for (const svgFile of svgFiles) {
      const inputPath = path.join(inputDir, svgFile);
      const outputFile = path.basename(svgFile, '.svg') + '.png';
      const outputPath = path.join(outputDir, outputFile);
      
      await svgToPngAspect(inputPath, outputPath, width, height, backgroundColor);
    }
    
    console.log(`🎉 Batch conversion complete! Converted ${svgFiles.length} files with aspect-ratio preservation.`);
    
  } catch (error) {
    console.error('❌ Error in batch conversion:', error.message);
    throw error;
  }
}

// Main function to handle command line arguments
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node svg-to-png-aspect.js <input-svg-file> [output-png-file] [width] [height] [background-color]');
    console.log('');
    console.log('Examples:');
    console.log('  node svg-to-png-aspect.js ./static/img/gh-stats-social-card.svg');
    console.log('  node svg-to-png-aspect.js input.svg output.png 1200 630');
    console.log('  node svg-to-png-aspect.js input.svg output.png 1200 630 "#ffffff"');
    console.log('');
    console.log('Environment variables:');
    console.log('  DEBUG_SVG=1  Write wrapper SVG to disk for debugging');
    console.log('');
    console.log('This script preserves aspect ratio by centering the SVG content and adding');
    console.log('letterboxing/pillarboxing as needed to prevent distortion.');
    return;
  }
  
  const inputPath = args[0];
  const outputPath = args[1] || inputPath.replace('.svg', '.png');
  const width = parseInt(args[2]) || 1200;
  const height = parseInt(args[3]) || 630;
  const backgroundColor = args[4] || '#000000';
  
  try {
    await svgToPngAspect(inputPath, outputPath, width, height, backgroundColor);
  } catch (error) {
    console.error('Failed to convert SVG:', error.message);
    process.exit(1);
  }
}

// Export functions for use as module
module.exports = { svgToPngAspect, batchConvertAspect };

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}