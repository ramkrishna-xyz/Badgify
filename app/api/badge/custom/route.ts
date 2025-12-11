import { NextRequest, NextResponse } from 'next/server';
import { generateBadge } from '@/lib/svg';
import { getTheme } from '@/lib/theme';
import { getPreset, presetExists } from '@/lib/presets';
import { trackBadgeView } from '@/lib/analytics';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Required parameters
    const label = searchParams.get('label');
    const value = searchParams.get('value');

    if (!label || !value) {
      return NextResponse.json(
        { error: 'label and value query parameters are required' },
        { status: 400 }
      );
    }

    // Optional parameters with defaults
    const color = searchParams.get('color') || '#4CAF50';
    const labelColor = searchParams.get('labelColor') || '#555';
    const style = (searchParams.get('style') as any) || 'flat';
    const theme = searchParams.get('theme');
    const preset = searchParams.get('preset');
    const track = searchParams.get('track') === 'true';
    const fontSize = parseInt(searchParams.get('fontSize') || '12', 10);
    const padding = parseInt(searchParams.get('padding') || '6', 10);
    const borderRadius = parseInt(searchParams.get('borderRadius') || '0', 10);

    // Validate style
    const validStyles = ['flat', 'flat-square', 'plastic', 'for-the-badge'];
    if (!validStyles.includes(style)) {
      return NextResponse.json(
        { error: `Invalid style. Must be one of: ${validStyles.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate dimensions
    if (fontSize < 8 || fontSize > 24) {
      return NextResponse.json(
        { error: 'fontSize must be between 8 and 24' },
        { status: 400 }
      );
    }

    if (padding < 0 || padding > 20) {
      return NextResponse.json(
        { error: 'padding must be between 0 and 20' },
        { status: 400 }
      );
    }

    if (borderRadius < 0 || borderRadius > 10) {
      return NextResponse.json(
        { error: 'borderRadius must be between 0 and 10' },
        { status: 400 }
      );
    }

    // Apply theme if specified
    let finalColor = color;
    let finalLabelColor = labelColor;

    if (theme && theme !== 'none') {
      const themeObj = getTheme(theme);
      finalLabelColor = themeObj.labelColor;
    }

    // Apply preset if specified
    if (preset && presetExists(preset)) {
      const presetObj = getPreset(preset);
      finalColor = presetObj.color;
    }

    // Validate colors (basic hex color validation)
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexColorRegex.test(finalColor)) {
      return NextResponse.json(
        { error: 'Invalid color format. Use hex colors like #FF0000' },
        { status: 400 }
      );
    }

    if (!hexColorRegex.test(finalLabelColor)) {
      return NextResponse.json(
        { error: 'Invalid labelColor format. Use hex colors like #FF0000' },
        { status: 400 }
      );
    }

    // Generate badge SVG
    const svg = generateBadge({
      label: decodeURIComponent(label),
      value: decodeURIComponent(value),
      color: finalColor,
      labelColor: finalLabelColor,
      style,
      fontSize,
      padding,
      borderRadius,
    });

    // Track view if requested
    if (track) {
      await trackBadgeView(label, value, '/api/badge/custom');
    }

    // Return SVG with proper headers
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml;charset=utf-8',
        'Cache-Control': 'public, max-age=3600, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Badge generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate badge' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
