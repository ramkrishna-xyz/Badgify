/**
 * SVG Badge Renderer
 * Pure TypeScript implementation for fast serverless badge generation
 */

export interface BadgeOptions {
  label: string;
  value: string;
  color?: string;
  labelColor?: string;
  style?: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge';
  borderRadius?: number;
  padding?: number;
  icon?: string;
  fontSize?: number;
  fontFamily?: string;
  gradient?: boolean;
}

export interface BadgeDimensions {
  labelWidth: number;
  valueWidth: number;
  height: number;
  padding: number;
}

/**
 * Calculate text width based on approximate character width
 */
function estimateTextWidth(text: string, fontSize: number): number {
  // Rough estimation: average character width is about 0.6 * fontSize
  const charWidth = fontSize * 0.55;
  return text.length * charWidth;
}

/**
 * Calculate badge dimensions
 */
function calculateDimensions(
  label: string,
  value: string,
  fontSize: number = 12,
  padding: number = 6
): BadgeDimensions {
  const labelWidth = estimateTextWidth(label, fontSize) + padding * 2;
  const valueWidth = estimateTextWidth(value, fontSize) + padding * 2;
  const height = fontSize + padding * 2;

  return {
    labelWidth,
    valueWidth,
    height,
    padding,
  };
}

/**
 * Generate SVG for flat style badge
 */
function generateFlatBadge(
  label: string,
  value: string,
  labelColor: string,
  valueColor: string,
  fontSize: number,
  padding: number
): string {
  const dims = calculateDimensions(label, value, fontSize, padding);
  const totalWidth = dims.labelWidth + dims.valueWidth;
  const textY = dims.height / 2 + fontSize / 3;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${dims.height}">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${labelColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${shadeColor(labelColor, -10)};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${valueColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${shadeColor(valueColor, -10)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${dims.labelWidth}" height="${dims.height}" fill="url(#grad1)"/>
  <rect x="${dims.labelWidth}" width="${dims.valueWidth}" height="${dims.height}" fill="url(#grad2)"/>
  <text x="${dims.labelWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9">${escapeXml(label)}</text>
  <text x="${dims.labelWidth + dims.valueWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9">${escapeXml(value)}</text>
</svg>`;
}

/**
 * Generate SVG for flat-square style badge
 */
function generateFlatSquareBadge(
  label: string,
  value: string,
  labelColor: string,
  valueColor: string,
  fontSize: number,
  padding: number
): string {
  const dims = calculateDimensions(label, value, fontSize, padding);
  const totalWidth = dims.labelWidth + dims.valueWidth;
  const textY = dims.height / 2 + fontSize / 3;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${dims.height}">
  <rect width="${dims.labelWidth}" height="${dims.height}" fill="${labelColor}"/>
  <rect x="${dims.labelWidth}" width="${dims.valueWidth}" height="${dims.height}" fill="${valueColor}"/>
  <text x="${dims.labelWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" opacity="0.95">${escapeXml(label)}</text>
  <text x="${dims.labelWidth + dims.valueWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" opacity="0.95">${escapeXml(value)}</text>
</svg>`;
}

/**
 * Generate SVG for plastic style badge with rounded corners
 */
function generatePlasticBadge(
  label: string,
  value: string,
  labelColor: string,
  valueColor: string,
  fontSize: number,
  padding: number,
  borderRadius: number = 3
): string {
  const dims = calculateDimensions(label, value, fontSize, padding);
  const totalWidth = dims.labelWidth + dims.valueWidth;
  const textY = dims.height / 2 + fontSize / 3;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${dims.height}">
  <defs>
    <linearGradient id="grad1p" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${labelColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${shadeColor(labelColor, -15)};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2p" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${valueColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${shadeColor(valueColor, -15)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${dims.labelWidth}" height="${dims.height}" rx="${borderRadius}" fill="url(#grad1p)"/>
  <rect x="${dims.labelWidth}" width="${dims.valueWidth}" height="${dims.height}" rx="${borderRadius}" fill="url(#grad2p)"/>
  <text x="${dims.labelWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" opacity="0.95">${escapeXml(label)}</text>
  <text x="${dims.labelWidth + dims.valueWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" opacity="0.95">${escapeXml(value)}</text>
</svg>`;
}

/**
 * Generate SVG for for-the-badge style (large, bold)
 */
function generateForTheBadge(
  label: string,
  value: string,
  labelColor: string,
  valueColor: string
): string {
  const fontSize = 18;
  const padding = 12;
  const dims = calculateDimensions(label, value, fontSize, padding);
  const totalWidth = dims.labelWidth + dims.valueWidth;
  const textY = dims.height / 2 + fontSize / 3;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${dims.height}">
  <defs>
    <linearGradient id="grad1ftb" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${labelColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${shadeColor(labelColor, -20)};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2ftb" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${valueColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${shadeColor(valueColor, -20)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="${dims.labelWidth}" height="${dims.height}" rx="3" fill="url(#grad1ftb)" filter="url(#shadow)"/>
  <rect x="${dims.labelWidth}" width="${dims.valueWidth}" height="${dims.height}" rx="3" fill="url(#grad2ftb)" filter="url(#shadow)"/>
  <text x="${dims.labelWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="900" text-anchor="middle" fill="white">${escapeXml(label)}</text>
  <text x="${dims.labelWidth + dims.valueWidth / 2}" y="${textY}" font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="${fontSize}" font-weight="900" text-anchor="middle" fill="white">${escapeXml(value)}</text>
</svg>`;
}

/**
 * Shade a color (lighten/darken)
 */
function shadeColor(color: string, percent: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate badge SVG
 */
export function generateBadge(options: BadgeOptions): string {
  const {
    label,
    value,
    color = '#4CAF50',
    labelColor = '#555',
    style = 'flat',
    fontSize = 12,
    padding = 6,
    borderRadius = 0,
  } = options;

  switch (style) {
    case 'flat':
      return generateFlatBadge(label, value, labelColor, color, fontSize, padding);
    case 'flat-square':
      return generateFlatSquareBadge(label, value, labelColor, color, fontSize, padding);
    case 'plastic':
      return generatePlasticBadge(label, value, labelColor, color, fontSize, padding, borderRadius);
    case 'for-the-badge':
      return generateForTheBadge(label, value, labelColor, color);
    default:
      return generateFlatBadge(label, value, labelColor, color, fontSize, padding);
  }
}
