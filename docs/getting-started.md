# Getting Started with Badgify

Welcome to **Badgify**, a lightweight, themeable badge rendering system built with Next.js and deployed on Vercel.

## What is Badgify?

Badgify is a serverless badge engine that generates dynamic SVG badges. Unlike static badge generators, Badgify supports:

- **Multiple Styles**: Flat, flat-square, plastic, and for-the-badge
- **Themes**: Pre-built themes for different aesthetics
- **Presets**: Status-based presets (success, warning, danger, info, neutral)
- **Analytics**: Optional view tracking with Vercel KV
- **CLI Tool**: Generate badges from the command line

## Quick Start

### Using the Web API

The simplest way to use Badgify is through the web API.

#### Simple Endpoint

```
GET /api/badge/{label}/{value}
```

**Example:**
```
https://badgify.vercel.app/api/badge/build/passing
```

**Query Parameters:**
- `color` - Badge color (hex, default: `#4CAF50`)
- `labelColor` - Label color (hex, default: `#555`)
- `style` - Badge style: `flat`, `flat-square`, `plastic`, `for-the-badge` (default: `flat`)
- `theme` - Theme name: `default`, `neon`, `minimal`, `soft`, `night`
- `preset` - Preset name: `success`, `warning`, `danger`, `info`, `neutral`
- `track` - Enable analytics tracking (default: `false`)

**Examples:**
```
/api/badge/status/passing?color=%234CAF50
/api/badge/version/1.0.0?style=flat-square
/api/badge/build/failing?preset=danger
/api/badge/tests/100%?theme=neon
```

### Advanced Endpoint

For more control, use the custom endpoint:

```
GET /api/badge/custom?label={label}&value={value}&[options]
```

**Required Parameters:**
- `label` - Badge label text
- `value` - Badge value text

**Optional Parameters:**
- `color` - Value color (hex format)
- `labelColor` - Label color (hex format)
- `style` - Badge style
- `fontSize` - Font size in pixels (8-24, default: 12)
- `padding` - Padding in pixels (0-20, default: 6)
- `borderRadius` - Border radius in pixels (0-10, default: 0)
- `theme` - Theme name
- `preset` - Preset name
- `track` - Enable analytics tracking

**Example:**
```
/api/badge/custom?label=Build&value=Passing&color=%234CAF50&style=plastic&fontSize=14
```

## Markdown Integration

Embed Badgify badges in your README:

```markdown
![Build Status](https://badgify.vercel.app/api/badge/build/passing?color=%234CAF50)
![Tests](https://badgify.vercel.app/api/badge/tests/100%25?preset=success)
![License](https://badgify.vercel.app/api/badge/license/MIT?theme=minimal)
```

## Using the CLI

Install and use the Badgify CLI tool:

```bash
npm install -g badgify
```

### Commands

```bash
# Create a badge and save as SVG
badgify create "Build" "Passing" --preset success

# Generate a shareable URL
badgify url "Status" "Active" --color #FF0000

# List all available themes
badgify theme list

# List all available presets
badgify preset list

# Preview badge in terminal
badgify preview "Test" "100%"
```

## Themes

Badgify comes with 5 built-in themes:

### Default
Classic badge style with subtle gradient
```
/api/badge/status/active?theme=default
```

### Neon
Bright, vibrant colors with glowing effect
```
/api/badge/status/active?theme=neon
```

### Minimal
Clean, minimal design with flat colors
```
/api/badge/status/active?theme=minimal
```

### Soft
Soft, rounded corners with pastel colors
```
/api/badge/status/active?theme=soft
```

### Night
Dark theme with muted colors
```
/api/badge/status/active?theme=night
```

## Presets

Status-based presets with predefined colors:

| Preset | Color | Use Case |
|--------|-------|----------|
| `success` | #4CAF50 (Green) | Passing tests, successful builds |
| `warning` | #FFC107 (Amber) | Warnings, experimental features |
| `danger` | #f44336 (Red) | Failing tests, errors |
| `info` | #2196F3 (Blue) | Information, documentation |
| `neutral` | #9E9E9E (Gray) | Neutral status |

**Example:**
```
/api/badge/build/passing?preset=success
/api/badge/tests/failing?preset=danger
/api/badge/docs/available?preset=info
```

## Analytics

Track badge views with optional analytics:

Add `?track=true` to any badge URL to enable tracking:

```
/api/badge/downloads/1000?track=true
/api/badge/custom?label=Stars&value=500&track=true
```

View analytics on the dashboard at `/dashboard` (requires GitHub login).

## Styling

### Color Formats

All color parameters accept hex color codes:
- `#FF0000` - Pure red
- `#4CAF50` - Green
- `#2196F3` - Blue

### Font Sizes

Font size must be between 8 and 24 pixels.

### Border Radius

Border radius must be between 0 and 10 pixels. Works best with `plastic` and `for-the-badge` styles.

## Deployment

### Deploy to Vercel

Badgify is optimized for Vercel deployment with Edge Functions:

```bash
vercel deploy
```

**Environment Variables:**

For analytics tracking, set your Vercel KV database:
```
KV_REST_API_TOKEN=your_token
KV_REST_API_URL=your_url
```

### Self-Hosted

To deploy elsewhere:

```bash
npm install
npm run build
npm start
```

## Examples

### GitHub Badge
```markdown
[![Build Status](https://badgify.vercel.app/api/badge/build/passing)](https://github.com)
```

### Version Badge
```markdown
![Version](https://badgify.vercel.app/api/badge/version/1.0.0?style=flat-square)
```

### Coverage Badge
```markdown
![Coverage](https://badgify.vercel.app/api/badge/coverage/95%25?preset=success)
```

## API Reference

For detailed API documentation, see [API Reference](./api-reference.md).

## Support

- Report issues: [GitHub Issues](https://github.com/badgify/badgify/issues)
- Discussions: [GitHub Discussions](https://github.com/badgify/badgify/discussions)
- Documentation: See the `/docs` directory

## License

MIT - See LICENSE file for details
