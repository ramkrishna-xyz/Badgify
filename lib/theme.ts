/**
 * Theme System for Badgify
 * Provides predefined themes with customizable colors, fonts, and styles
 */

export interface Theme {
  name: string;
  description: string;
  background: string;
  textColor: string;
  labelColor: string;
  borderColor: string;
  fontSize: number;
  padding: number;
  borderRadius: number;
}

export type ThemeName = 'default' | 'neon' | 'minimal' | 'soft' | 'night';

const THEMES: Record<ThemeName, Theme> = {
  default: {
    name: 'default',
    description: 'Classic badge style with subtle gradient',
    background: '#f5f5f5',
    textColor: '#fff',
    labelColor: '#555',
    borderColor: '#ddd',
    fontSize: 12,
    padding: 6,
    borderRadius: 0,
  },
  neon: {
    name: 'neon',
    description: 'Bright, vibrant colors with glowing effect',
    background: '#1a1a2e',
    textColor: '#fff',
    labelColor: '#00ff00',
    borderColor: '#00ff00',
    fontSize: 12,
    padding: 8,
    borderRadius: 4,
  },
  minimal: {
    name: 'minimal',
    description: 'Clean, minimal design with flat colors',
    background: '#ffffff',
    textColor: '#333',
    labelColor: '#f0f0f0',
    borderColor: '#e0e0e0',
    fontSize: 11,
    padding: 5,
    borderRadius: 2,
  },
  soft: {
    name: 'soft',
    description: 'Soft, rounded corners with pastel colors',
    background: '#fafafa',
    textColor: '#fff',
    labelColor: '#9e9e9e',
    borderColor: '#e0e0e0',
    fontSize: 12,
    padding: 8,
    borderRadius: 6,
  },
  night: {
    name: 'night',
    description: 'Dark theme with muted colors',
    background: '#1e1e1e',
    textColor: '#fff',
    labelColor: '#444',
    borderColor: '#333',
    fontSize: 12,
    padding: 6,
    borderRadius: 3,
  },
};

/**
 * Get a theme by name
 */
export function getTheme(name: string): Theme {
  const theme = THEMES[name as ThemeName];
  return theme || THEMES.default;
}

/**
 * List all available themes
 */
export function listThemes(): Theme[] {
  return Object.values(THEMES);
}

/**
 * Get theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(THEMES) as ThemeName[];
}

/**
 * Check if a theme exists
 */
export function themeExists(name: string): boolean {
  return name in THEMES;
}

/**
 * Create a custom theme
 */
export function createCustomTheme(overrides: Partial<Theme>): Theme {
  return {
    ...THEMES.default,
    ...overrides,
  };
}
