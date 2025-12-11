# API Reference

Complete API documentation for Badgify.

## Endpoints

### Simple Badge Endpoint

```
GET /api/badge/{label}/{value}
```

Generate a badge with URL path parameters.

#### Parameters

| Parameter | Location | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `label` | path | string | required | Badge label text |
| `value` | path | string | required | Badge value text |
| `color` | query | hex | `#4CAF50` | Value section color |
| `labelColor` | query | hex | `#555` | Label section color |
| `style` | query | string | `flat` | Badge style |
| `theme` | query | string | - | Theme to apply |
| `preset` | query | string | - | Preset to apply |
| `track` | query | boolean | `false` | Enable view tracking |

#### Response

- **Content-Type**: `image/svg+xml;charset=utf-8`
- **Cache-Control**: `public, max-age=3600, immutable`
- **Access-Control**: CORS enabled

#### Examples

**Basic badge:**
```bash
curl https://badgify.vercel.app/api/badge/build/passing
```

**With color:**
```bash
curl 'https://badgify.vercel.app/api/badge/status/active?color=%234CAF50'
```

**With style:**
```bash
curl 'https://badgify.vercel.app/api/badge/version/1.0.0?style=plastic'
```

**With theme:**
```bash
curl 'https://badgify.vercel.app/api/badge/health/ok?theme=neon'
```

**With preset:**
```bash
curl 'https://badgify.vercel.app/api/badge/tests/passing?preset=success'
```

**With tracking:**
```bash
curl 'https://badgify.vercel.app/api/badge/downloads/1000?track=true'
```

---

### Custom Badge Endpoint

```
GET /api/badge/custom?{parameters}
```

Advanced endpoint for fine-grained control over badge appearance.

#### Parameters

| Parameter | Type | Min | Max | Default | Description |
|-----------|------|-----|-----|---------|-------------|
| `label` | string | - | - | required | Badge label text |
| `value` | string | - | - | required | Badge value text |
| `color` | hex | - | - | `#4CAF50` | Value color |
| `labelColor` | hex | - | - | `#555` | Label color |
| `style` | enum | - | - | `flat` | Badge style |
| `fontSize` | number | 8 | 24 | 12 | Font size in pixels |
| `padding` | number | 0 | 20 | 6 | Padding in pixels |
| `borderRadius` | number | 0 | 10 | 0 | Border radius in pixels |
| `theme` | string | - | - | - | Theme name |
| `preset` | string | - | - | - | Preset name |
| `track` | boolean | - | - | `false` | Enable tracking |

#### Style Options

| Style | Description |
|-------|-------------|
| `flat` | Flat design with subtle gradient |
| `flat-square` | Flat design without rounded corners |
| `plastic` | 3D plastic appearance with gradients |
| `for-the-badge` | Large, bold style with shadow effect |

#### Response

- **Content-Type**: `image/svg+xml;charset=utf-8`
- **Cache-Control**: `public, max-age=3600, immutable`
- **CORS**: Enabled

#### Error Responses

**400 Bad Request:**
```json
{ "error": "label and value query parameters are required" }
```

**400 Bad Request (Invalid Style):**
```json
{ "error": "Invalid style. Must be one of: flat, flat-square, plastic, for-the-badge" }
```

**400 Bad Request (Invalid Color):**
```json
{ "error": "Invalid color format. Use hex colors like #FF0000" }
```

**400 Bad Request (Invalid Range):**
```json
{ "error": "fontSize must be between 8 and 24" }
```

**500 Internal Server Error:**
```json
{ "error": "Failed to generate badge" }
```

#### Examples

**Basic custom badge:**
```bash
curl 'https://badgify.vercel.app/api/badge/custom?label=Build&value=Passing'
```

**With full styling:**
```bash
curl 'https://badgify.vercel.app/api/badge/custom?label=Status&value=Active&color=%234CAF50&style=plastic&fontSize=14&padding=8&borderRadius=4'
```

**URL-encoded special characters:**
```bash
curl 'https://badgify.vercel.app/api/badge/custom?label=Coverage&value=95%25&preset=success'
```

---

## Color Specifications

### Hex Colors

All colors use 6-digit hex format: `#RRGGBB`

**Examples:**
- `#FF0000` - Red
- `#00FF00` - Green
- `#0000FF` - Blue
- `#4CAF50` - Material Green
- `#2196F3` - Material Blue
- `#FFC107` - Material Amber
- `#f44336` - Material Red

### Standard Colors

| Color | Hex | Use |
|-------|-----|-----|
| Red | `#f44336` | Errors, Danger |
| Green | `#4CAF50` | Success, Passing |
| Blue | `#2196F3` | Info, Status |
| Amber | `#FFC107` | Warning |
| Gray | `#9E9E9E` | Neutral |

---

## Themes

### Theme Objects

Each theme defines styling properties:

```typescript
{
  name: string;
  description: string;
  background: string;      // Background color
  textColor: string;        // Text color
  labelColor: string;       // Label section color
  borderColor: string;      // Border color
  fontSize: number;         // Font size
  padding: number;          // Padding
  borderRadius: number;     // Border radius
}
```

### Available Themes

#### Default
Classic badge style with subtle gradient

**Properties:**
- Label Color: `#555`
- Font Size: 12px
- Padding: 6px

```
/api/badge/status/ok?theme=default
```

#### Neon
Bright, vibrant colors with glowing effect

**Properties:**
- Label Color: `#00ff00`
- Font Size: 12px
- Padding: 8px

```
/api/badge/status/ok?theme=neon
```

#### Minimal
Clean, minimal design with flat colors

**Properties:**
- Label Color: `#f0f0f0`
- Font Size: 11px
- Padding: 5px

```
/api/badge/status/ok?theme=minimal
```

#### Soft
Soft, rounded corners with pastel colors

**Properties:**
- Label Color: `#9e9e9e`
- Font Size: 12px
- Padding: 8px
- Border Radius: 6px

```
/api/badge/status/ok?theme=soft
```

#### Night
Dark theme with muted colors

**Properties:**
- Label Color: `#444`
- Font Size: 12px
- Padding: 6px

```
/api/badge/status/ok?theme=night
```

---

## Presets

### Preset Objects

Each preset defines status-based styling:

```typescript
{
  name: string;
  description: string;
  color: string;            // Preset color
  icon?: string;            // Optional icon
}
```

### Available Presets

#### Success
For passing tests, successful builds, and achievements

**Color:** `#4CAF50` (Green)

```
/api/badge/build/passing?preset=success
/api/badge/tests/100%?preset=success
```

#### Warning
For warnings, deprecations, and experimental features

**Color:** `#FFC107` (Amber)

```
/api/badge/status/experimental?preset=warning
/api/badge/version/beta?preset=warning
```

#### Danger
For errors, failures, and critical issues

**Color:** `#f44336` (Red)

```
/api/badge/build/failing?preset=danger
/api/badge/tests/0%?preset=danger
```

#### Info
For information, documentation, and announcements

**Color:** `#2196F3` (Blue)

```
/api/badge/docs/available?preset=info
/api/badge/api/v2?preset=info
```

#### Neutral
For neutral or unknown states

**Color:** `#9E9E9E` (Gray)

```
/api/badge/status/unknown?preset=neutral
/api/badge/support/tbd?preset=neutral
```

---

## Rate Limiting

Currently, Badgify does not have rate limits. However, for high-traffic usage, we recommend:

1. Using cached badge URLs
2. Generating badges at build time
3. Implementing your own caching layer

---

## CORS

All endpoints support CORS with the following headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Caching

Badges are cached with:
- **Cache-Control**: `public, max-age=3600, immutable`
- **Duration**: 1 hour

For permanent badges, use immutable URLs (don't change parameters).

---

## Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Badge generated |
| 400 | Bad Request | Missing parameters or invalid values |
| 500 | Server Error | Badge generation failed |

---

## Examples by Use Case

### CI/CD Pipeline

```markdown
[![Build Status](https://badgify.vercel.app/api/badge/build/passing?preset=success)](https://ci.example.com)
[![Tests](https://badgify.vercel.app/api/badge/tests/95%25?preset=success)](https://tests.example.com)
[![Coverage](https://badgify.vercel.app/api/badge/coverage/95%25?preset=success)](https://coverage.example.com)
```

### Project Status

```markdown
![Version](https://badgify.vercel.app/api/badge/version/1.0.0)
![License](https://badgify.vercel.app/api/badge/license/MIT?theme=minimal)
![Status](https://badgify.vercel.app/api/badge/status/maintained?preset=success)
```

### Streaming Services

```markdown
![Viewers](https://badgify.vercel.app/api/badge/viewers/1000?track=true)
![Downloads](https://badgify.vercel.app/api/badge/downloads/5000?track=true)
```

---

## Support

For issues or questions, open an issue on [GitHub](https://github.com/badgify/badgify/issues).
