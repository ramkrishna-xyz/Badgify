import { NextRequest, NextResponse } from 'next/server';
import { generateBadge } from '@/lib/svg';
import { getTheme } from '@/lib/theme';
import { getPreset, presetExists } from '@/lib/presets';
import { trackBadgeView } from '@/lib/analytics';

export const runtime = 'edge';

interface Params {
  params: {
    label: string;
    value: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { label, value } = params;

    // URL query parameters for customization
    const searchParams = request.nextUrl.searchParams;
    const color = searchParams.get('color') || '#4CAF50';
    const labelColor = searchParams.get('labelColor') || '#555';
    const style = (searchParams.get('style') as any) || 'flat';
    const theme = searchParams.get('theme');
    const preset = searchParams.get('preset');
    const track = searchParams.get('track') === 'true';
    const fontSize = parseInt(searchParams.get('fontSize') || '12', 10);
    const padding = parseInt(searchParams.get('padding') || '6', 10);
    const borderRadius = parseInt(searchParams.get('borderRadius') || '0', 10);

    // Decode URL-encoded label and value
    const decodedLabel = decodeURIComponent(label);
    const decodedValue = decodeURIComponent(value);

    // Validate inputs
    if (!decodedLabel || !decodedValue) {
      return NextResponse.json(
        { error: 'Label and value are required' },
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

    // Generate badge SVG
    const svg = generateBadge({
      label: decodedLabel,
      value: decodedValue,
      color: finalColor,
      labelColor: finalLabelColor,
      style,
      fontSize,
      padding,
      borderRadius,
    });

    // Track view if requested
    if (track) {
      await trackBadgeView(decodedLabel, decodedValue, request.nextUrl.pathname);
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
