/**
 * Badge Presets
 * Predefined status badges with standard colors and meanings
 */

export interface Preset {
  name: string;
  description: string;
  color: string;
  icon?: string;
}

export type PresetName = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const PRESETS: Record<PresetName, Preset> = {
  success: {
    name: 'success',
    description: 'Indicates a successful state',
    color: '#4CAF50',
    icon: '✓',
  },
  warning: {
    name: 'warning',
    description: 'Indicates a warning state',
    color: '#FFC107',
    icon: '⚠',
  },
  danger: {
    name: 'danger',
    description: 'Indicates a dangerous or error state',
    color: '#f44336',
    icon: '✕',
  },
  info: {
    name: 'info',
    description: 'Indicates an informational state',
    color: '#2196F3',
    icon: 'ℹ',
  },
  neutral: {
    name: 'neutral',
    description: 'Neutral state',
    color: '#9E9E9E',
    icon: '◌',
  },
};

/**
 * Get a preset by name
 */
export function getPreset(name: string): Preset {
  const preset = PRESETS[name as PresetName];
  return preset || PRESETS.neutral;
}

/**
 * List all available presets
 */
export function listPresets(): Preset[] {
  return Object.values(PRESETS);
}

/**
 * Get preset names
 */
export function getPresetNames(): PresetName[] {
  return Object.keys(PRESETS) as PresetName[];
}

/**
 * Check if a preset exists
 */
export function presetExists(name: string): boolean {
  return name in PRESETS;
}

/**
 * Get color by preset name
 */
export function getPresetColor(name: string): string {
  return getPreset(name).color;
}

/**
 * Get icon by preset name
 */
export function getPresetIcon(name: string): string | undefined {
  return getPreset(name).icon;
}
