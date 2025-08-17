# Kam Lasater's Website

This is the source code for [kamlasater.com](https://kamlasater.com), built with Docusaurus.

## SVG to PNG Conversion

The repository includes an improved SVG-to-PNG conversion script that addresses common rendering issues with complex SVGs (like GitHub stats cards).

### Features

- **Multiple conversion methods** for different quality needs
- **GitHub Actions ready** with proper dependency management
- **Automatic background handling** for social media cards
- **High-quality text rendering** for crisp, readable output
- **No borders** - SVG fills entire PNG dimensions without distortion

### Conversion Methods

1. **Sharp (default)**: Fast conversion using Sharp library
2. **High Quality**: Enhanced Sharp settings with better DPI and quality
3. **Puppeteer**: Browser-based rendering for superior quality and font support

### Usage

#### Command Line

```bash
# Basic conversion
npm run svg-to-png static/img/gh-stats-social-card.svg

# High quality Sharp conversion
npm run svg-to-png:hq

# Puppeteer-based conversion (best quality)
npm run svg-to-png:puppeteer

# Convert GitHub stats specifically (no borders)
npm run gh-stats:png

# Custom parameters
node bin/svg-to-png.js input.svg output.png 1200 630 --puppeteer
```

#### GitHub Actions

The workflow automatically converts SVGs to PNGs when:
- SVG files are pushed to the `main` branch
- Manually triggered with custom parameters

#### Dependencies

All dependencies are managed in `package.json`:
- `sharp`: Fast SVG-to-PNG conversion
- `puppeteer`: High-quality browser-based rendering

### Why Puppeteer?

For complex SVGs with:
- Custom fonts
- CSS animations
- Complex styling
- Text that needs to be crisp

Puppeteer renders using a real browser engine, ensuring fonts and styling render exactly as intended.

## Development

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


