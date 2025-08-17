const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

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
    
    // Convert SVG to PNG with Sharp
    const pngBuffer = await sharp(svgBuffer)
      .resize({
        width: width,
        height: height,
        fit: 'contain', // Maintains aspect ratio without distortion
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .png({
        compressionLevel: 6,
        adaptiveFiltering: false
      })
      .toBuffer();
    
    // Write the PNG file
    await fs.writeFile(outputPath, pngBuffer);
    
    console.log(`✅ Successfully converted ${inputPath} to ${outputPath}`);
    console.log(`📏 Output dimensions: ${width}x${height}px with transparent background`);
    
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