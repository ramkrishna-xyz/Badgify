#!/usr/bin/env node

/**
 * Badgify CLI Tool
 * Generate and preview badges from the command line
 */

const fs = require('fs');
const path = require('path');

// Import the SVG generator and utilities
const svg = require('../lib/svg');
const theme = require('../lib/theme');
const presets = require('../lib/presets');

const args = process.argv.slice(2);
const command = args[0];

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color] || ''}${message}${colors.reset}`);
}

function printHelp() {
  log('Badgify CLI - Dynamic Badge Generator\n', 'bright');
  log('Usage: badgify <command> [options]\n', 'blue');
  log('Commands:', 'bright');
  log('  create <label> <value>    Create and display a badge');
  log('  url <label> <value>       Generate a badge URL');
  log('  theme list                List all available themes');
  log('  preset list               List all available presets');
  log('  preview <label> <value>   Display badge in terminal (ASCII)');
  log('  help                      Show this help message');
  log('\nOptions:', 'bright');
  log('  --color <hex>             Set badge color (e.g., --color #FF0000)');
  log('  --style <style>           Set style (flat, flat-square, plastic, for-the-badge)');
  log('  --theme <theme>           Apply a theme');
  log('  --preset <preset>         Apply a preset');
  log('\nExamples:', 'bright');
  log('  badgify create "Build" "Passing" --preset success');
  log('  badgify url "Status" "Active" --color #4CAF50');
  log('  badgify theme list');
  log('  badgify preview "Test" "100%"');
}

function parseOptions(args) {
  const options = {
    color: '#4CAF50',
    labelColor: '#555',
    style: 'flat',
    theme: null,
    preset: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--color' && args[i + 1]) {
      options.color = args[++i];
    } else if (args[i] === '--labelColor' && args[i + 1]) {
      options.labelColor = args[++i];
    } else if (args[i] === '--style' && args[i + 1]) {
      options.style = args[++i];
    } else if (args[i] === '--theme' && args[i + 1]) {
      options.theme = args[++i];
    } else if (args[i] === '--preset' && args[i + 1]) {
      options.preset = args[++i];
    }
  }

  return options;
}

function createBadge(label, value, options) {
  try {
    let finalColor = options.color;
    let finalLabelColor = options.labelColor;

    // Apply theme if specified
    if (options.theme) {
      const themeObj = theme.getTheme(options.theme);
      finalLabelColor = themeObj.labelColor;
    }

    // Apply preset if specified
    if (options.preset && presets.presetExists(options.preset)) {
      const presetObj = presets.getPreset(options.preset);
      finalColor = presetObj.color;
    }

    const badgeSvg = svg.generateBadge({
      label,
      value,
      color: finalColor,
      labelColor: finalLabelColor,
      style: options.style,
      fontSize: 12,
      padding: 6,
      borderRadius: 0,
    });

    return badgeSvg;
  } catch (error) {
    log(`Error creating badge: ${error.message}`, 'red');
    process.exit(1);
  }
}

function generateUrl(label, value, options) {
  const params = new URLSearchParams();
  params.append('label', label);
  params.append('value', value);

  if (options.color !== '#4CAF50') params.append('color', options.color);
  if (options.labelColor !== '#555') params.append('labelColor', options.labelColor);
  if (options.style !== 'flat') params.append('style', options.style);
  if (options.theme) params.append('theme', options.theme);
  if (options.preset) params.append('preset', options.preset);

  return `/api/badge/custom?${params.toString()}`;
}

function handleCreate(args) {
  if (args.length < 2) {
    log('Usage: badgify create <label> <value> [options]', 'yellow');
    process.exit(1);
  }

  const label = args[0];
  const value = args[1];
  const options = parseOptions(args.slice(2));

  const badgeSvg = createBadge(label, value, options);

  // Save to file
  const filename = `badge-${label}-${value}.svg`;
  fs.writeFileSync(filename, badgeSvg);
  log(`Badge created: ${filename}`, 'green');
  log(`Label: ${label} | Value: ${value} | Style: ${options.style}`, 'blue');
}

function handleUrl(args) {
  if (args.length < 2) {
    log('Usage: badgify url <label> <value> [options]', 'yellow');
    process.exit(1);
  }

  const label = args[0];
  const value = args[1];
  const options = parseOptions(args.slice(2));

  const url = generateUrl(label, value, options);
  log('Badge URL:', 'bright');
  log(url, 'green');
}

function handleThemeList() {
  const themes = theme.listThemes();
  log('Available Themes:\n', 'bright');

  themes.forEach((t) => {
    log(`${t.name.toUpperCase()}`, 'blue');
    log(`  ${t.description}`);
    log(`  Label Color: ${t.labelColor}`);
    log();
  });
}

function handlePresetList() {
  const presetsList = presets.listPresets();
  log('Available Presets:\n', 'bright');

  presetsList.forEach((p) => {
    log(`${p.name.toUpperCase()}`, 'blue');
    log(`  ${p.description}`);
    log(`  Color: ${p.color}`);
    log();
  });
}

function handlePreview(args) {
  if (args.length < 2) {
    log('Usage: badgify preview <label> <value> [options]', 'yellow');
    process.exit(1);
  }

  const label = args[0];
  const value = args[1];

  // Simple ASCII badge representation
  log('\nBadge Preview (ASCII):', 'bright');
  log('╔════════════════════════╗', 'blue');
  log(`║ ${label.padEnd(9)} │ ${value.padEnd(8)} ║`, 'blue');
  log('╚════════════════════════╝', 'blue');
  log();
}

// Main CLI routing
function main() {
  if (!command || command === 'help' || command === '-h' || command === '--help') {
    printHelp();
    return;
  }

  switch (command) {
    case 'create':
      handleCreate(args.slice(1));
      break;
    case 'url':
      handleUrl(args.slice(1));
      break;
    case 'theme':
      if (args[1] === 'list') {
        handleThemeList();
      } else {
        log('Usage: badgify theme list', 'yellow');
      }
      break;
    case 'preset':
      if (args[1] === 'list') {
        handlePresetList();
      } else {
        log('Usage: badgify preset list', 'yellow');
      }
      break;
    case 'preview':
      handlePreview(args.slice(1));
      break;
    default:
      log(`Unknown command: ${command}`, 'red');
      log('Run "badgify help" for usage information', 'yellow');
      process.exit(1);
  }
}

main();
