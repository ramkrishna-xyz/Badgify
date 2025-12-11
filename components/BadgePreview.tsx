'use client';

import { useState, useEffect } from 'react';
import { generateBadge } from '@/lib/svg';
import { listThemes } from '@/lib/theme';
import { listPresets } from '@/lib/presets';

interface BadgePreviewProps {
  label?: string;
  value?: string;
}

export default function BadgePreview({ label = 'Example', value = 'Badge' }: BadgePreviewProps) {
  const [customLabel, setCustomLabel] = useState(label);
  const [customValue, setCustomValue] = useState(value);
  const [color, setColor] = useState('#4CAF50');
  const [labelColor, setLabelColor] = useState('#555');
  const [style, setStyle] = useState('flat');
  const [fontSize, setFontSize] = useState(12);
  const [padding, setPadding] = useState(6);
  const [borderRadius, setBorderRadius] = useState(0);
  const [theme, setTheme] = useState('none');
  const [preset, setPreset] = useState('none');
  const [svgContent, setSvgContent] = useState('');
  const [copyUrl, setCopyUrl] = useState('');

  const themes = listThemes();
  const presets = listPresets();

  useEffect(() => {
    const svg = generateBadge({
      label: customLabel || 'Label',
      value: customValue || 'Value',
      color,
      labelColor,
      style: style as any,
      fontSize,
      padding,
      borderRadius,
    });
    setSvgContent(svg);

    // Generate URL
    const params = new URLSearchParams();
    params.append('label', customLabel);
    params.append('value', customValue);
    params.append('color', color);
    params.append('labelColor', labelColor);
    params.append('style', style);
    params.append('fontSize', fontSize.toString());
    params.append('padding', padding.toString());
    params.append('borderRadius', borderRadius.toString());

    const url = `/api/badge/custom?${params.toString()}`;
    setCopyUrl(url);
  }, [customLabel, customValue, color, labelColor, style, fontSize, padding, borderRadius]);

  const copyToClipboard = () => {
    const fullUrl = `${window.location.origin}${copyUrl}`;
    navigator.clipboard.writeText(fullUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
          <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center min-h-32">
            {svgContent && (
              <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="inline-block"
              />
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Copy URL
          </button>
          <div className="bg-gray-100 p-3 rounded break-all text-sm font-mono text-gray-600">
            {copyUrl}
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Customize</h2>

          {/* Text Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Badge label"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Badge value"
            />
          </div>

          {/* Color Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label Color</label>
              <input
                type="color"
                value={labelColor}
                onChange={(e) => setLabelColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Style Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="plastic">Plastic</option>
              <option value="for-the-badge">For the Badge</option>
            </select>
          </div>

          {/* Theme Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              {themes.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preset Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preset</label>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              {presets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} - {p.description}
                </option>
              ))}
            </select>
          </div>

          {/* Numeric Inputs */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <input
                type="number"
                min="8"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Math.max(8, Math.min(24, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
              <input
                type="number"
                min="0"
                max="20"
                value={padding}
                onChange={(e) => setPadding(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
              <input
                type="number"
                min="0"
                max="10"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
