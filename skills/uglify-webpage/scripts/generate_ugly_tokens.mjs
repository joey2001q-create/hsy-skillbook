#!/usr/bin/env node

import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const PRESETS = {
  "rainbow-chaos": {
    description: "Saturated collisions, mismatched sections, and rainbow borders",
    colors: ["#ff00a8", "#00ff66", "#ffee00", "#0057ff", "#ff3d00", "#8f00ff", "#00e5ff", "#ff8a00", "#111111", "#ffffff"],
    patterns: ["checkerboard", "confetti", "zigzag", "hard-stripes"],
    assets: ["stickers", "subject-photo", "tiled-pattern"],
  },
  geocities: {
    description: "Early-web tiles, badges, counters, and mixed legacy typography",
    colors: ["#000080", "#ffff00", "#ff00ff", "#00ffff", "#00ff00", "#ff0000", "#ffffff", "#808080", "#000000"],
    patterns: ["starfield", "checkerboard", "tiled-clouds", "construction-stripes"],
    assets: ["counter", "badge", "pixel-divider", "subject-gif"],
  },
  "discount-mall": {
    description: "Dense promotion language, price bursts, bevels, and urgent color",
    colors: ["#ff0000", "#fff200", "#ff6a00", "#00d9ff", "#25ff00", "#7a00ff", "#111111", "#ffffff", "#ff69b4"],
    patterns: ["sale-stripes", "halftone", "checkerboard", "confetti"],
    assets: ["starburst", "coupon", "product-photo", "price-sticker"],
  },
  "office-art": {
    description: "WordArt-like headings, clip-art cues, gradients, and long shadows",
    colors: ["#1f4eaa", "#ed7d31", "#70ad47", "#ffc000", "#7030a0", "#5b9bd5", "#ff66cc", "#222222", "#ffffff"],
    patterns: ["diagonal-gradient", "paper-grid", "confetti", "metallic-band"],
    assets: ["clip-art", "ribbon", "sparkle", "subject-photo"],
  },
  "portal-2005": {
    description: "Dense portals, blue panels, table modules, and unrelated alerts",
    colors: ["#003399", "#3366cc", "#99ccff", "#ff9900", "#ff0000", "#33cc33", "#ffffcc", "#666666", "#ffffff"],
    patterns: ["blue-grid", "metallic-band", "dotted-divider", "hard-gradient"],
    assets: ["tiny-icon", "banner", "subject-photo", "link-badge"],
  },
  "visual-accident": {
    description: "Maximum conflict across incompatible eras and component systems",
    colors: ["#ff1493", "#7fff00", "#00bfff", "#ff4500", "#9400d3", "#ffff00", "#00ffcc", "#8b4513", "#111111", "#ffffff"],
    patterns: ["checkerboard", "confetti", "starfield", "sale-stripes", "paper-grid"],
    assets: ["starburst", "clip-art", "counter", "coupon", "subject-photo"],
  },
};

const FONT_STACKS = [
  '"Times New Roman", Times, serif',
  'Arial, Helvetica, sans-serif',
  '"Courier New", Courier, monospace',
  'Impact, Haettenschweiler, sans-serif',
  '"Comic Sans MS", "Comic Sans", cursive',
  'Georgia, "Times New Roman", serif',
  'Verdana, Geneva, sans-serif',
  'Papyrus, fantasy',
];

const BORDER_STYLES = ["solid", "dashed", "dotted", "double", "ridge", "groove", "outset", "inset"];
const TEXT_DECORATIONS = ["none", "underline", "overline", "underline overline", "line-through"];
const TEXT_TRANSFORMS = ["none", "uppercase", "lowercase", "capitalize"];
const SHADOWS = [
  "4px 4px 0 #000",
  "-5px 6px 0 #ff00a8",
  "0 0 12px #ffee00",
  "8px 9px 0 #00e5ff",
  "inset 3px 3px 0 #fff, inset -4px -4px 0 #333",
  "12px 3px 0 #8f00ff",
];

function usage() {
  return `Usage:
  node generate_ugly_tokens.mjs [options]

Options:
  --mode <name>          create or uglify-existing (default: create)
  --preset <name>       Preset name (default: rainbow-chaos)
  --ugliness <1-5>      Conflict intensity (default: 4)
  --seed <value>        Reproducible string or number seed
  --usability <name>     functional or full-chaos (default: functional)
  --format <json|css>   Output format (default: json)
  --output <path>       Write output to a file instead of stdout
  --overwrite           Replace an existing output file
  --list-presets        Print preset names and descriptions
  --help                Show this help`;
}

function parseArgs(argv) {
  const options = {
    mode: "create",
    preset: "rainbow-chaos",
    ugliness: 4,
    seed: randomBytes(8).toString("hex"),
    usability: "functional",
    format: "json",
    output: null,
    overwrite: false,
    listPresets: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--overwrite") options.overwrite = true;
    else if (argument === "--list-presets") options.listPresets = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else if (["--mode", "--preset", "--ugliness", "--seed", "--usability", "--format", "--output"].includes(argument)) {
      const value = argv[index + 1];
      if (value === undefined) throw new Error(`${argument} requires a value`);
      index += 1;
      if (argument === "--mode") options.mode = value;
      if (argument === "--preset") options.preset = value;
      if (argument === "--ugliness") options.ugliness = Number(value);
      if (argument === "--seed") options.seed = value;
      if (argument === "--usability") options.usability = value;
      if (argument === "--format") options.format = value;
      if (argument === "--output") options.output = value;
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  if (!PRESETS[options.preset]) throw new Error(`Unknown preset: ${options.preset}`);
  if (!["create", "uglify-existing"].includes(options.mode)) {
    throw new Error("--mode must be create or uglify-existing");
  }
  if (!Number.isInteger(options.ugliness) || options.ugliness < 1 || options.ugliness > 5) {
    throw new Error("--ugliness must be an integer from 1 to 5");
  }
  if (!["json", "css"].includes(options.format)) throw new Error("--format must be json or css");
  if (!["functional", "full-chaos"].includes(options.usability)) {
    throw new Error("--usability must be functional or full-chaos");
  }
  return options;
}

function xmur3(value) {
  let hash = 1779033703 ^ value.length;
  for (let index = 0; index < value.length; index += 1) {
    hash = Math.imul(hash ^ value.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
  };
}

function mulberry32(seed) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(values, random) {
  const output = [...values];
  for (let index = output.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [output[index], output[target]] = [output[target], output[index]];
  }
  return output;
}

function take(values, count, random) {
  return shuffle(values, random).slice(0, Math.min(count, values.length));
}

function integer(minimum, maximum, random) {
  return Math.floor(random() * (maximum - minimum + 1)) + minimum;
}

function generateTokens(options) {
  const seedFactory = xmur3(`${options.seed}:${options.preset}:${options.ugliness}`);
  const random = mulberry32(seedFactory());
  const preset = PRESETS[options.preset];
  const intensity = options.ugliness;
  const colors = take(preset.colors, Math.min(preset.colors.length, 4 + intensity), random);
  const fonts = take(FONT_STACKS, Math.min(FONT_STACKS.length, 2 + Math.ceil(intensity / 2)), random);
  const borderStyles = take(BORDER_STYLES, Math.min(BORDER_STYLES.length, 2 + intensity), random);
  const shadows = take(SHADOWS, Math.min(SHADOWS.length, 1 + intensity), random);
  const spacing = Array.from({ length: 7 }, (_, index) => {
    const base = [3, 7, 12, 19, 29, 43, 67][index];
    return Math.max(1, base + integer(-intensity, intensity * 2, random));
  });
  const rotations = Array.from({ length: 6 }, () => integer(-2 - intensity * 2, 2 + intensity * 2, random));
  const offsets = Array.from({ length: 6 }, () => integer(-4 - intensity * 3, 4 + intensity * 3, random));
  const radii = take([0, 2, 5, 11, 19, 31, 999], Math.min(7, 2 + intensity), random);
  const borderWidths = take([1, 2, 3, 5, 8, 11, 16], Math.min(7, 2 + intensity), random);
  const motionDurations = take([137, 233, 420, 777, 1111, 1666, 2400], Math.min(7, 2 + intensity), random);
  const requiredDimensions = [2, 3, 4, 6, 8][intensity - 1];

  return {
    version: 1,
    seed: String(options.seed),
    mode: options.mode,
    preset: options.preset,
    presetDescription: preset.description,
    ugliness: intensity,
    usability: options.usability,
    colors,
    fonts,
    borders: {
      styles: borderStyles,
      widthsPx: borderWidths,
      radiiPx: radii,
    },
    shadows,
    spacingPx: spacing,
    rotationsDeg: rotations,
    offsetsPx: offsets,
    typography: {
      decorations: take(TEXT_DECORATIONS, Math.min(TEXT_DECORATIONS.length, 1 + intensity), random),
      transforms: take(TEXT_TRANSFORMS, Math.min(TEXT_TRANSFORMS.length, 1 + Math.ceil(intensity / 2)), random),
    },
    motion: {
      durationsMs: motionDurations,
      maxFlashHz: 2.5,
      respectReducedMotion: true,
    },
    patterns: take(preset.patterns, Math.min(preset.patterns.length, 1 + Math.ceil(intensity / 2)), random),
    assetSuggestions: take(preset.assets, Math.min(preset.assets.length, 1 + Math.ceil(intensity / 2)), random),
    ledgerTargets: {
      requiredConflictDimensions: requiredDimensions,
      minimumDistinctColors: colors.length,
      minimumFontStacks: fonts.length,
      desktopAndMobileEvidence: true,
      primaryWorkflowMustPass: true,
    },
  };
}

function toCss(tokens) {
  const lines = [
    `/* mode=${tokens.mode} preset=${tokens.preset} ugliness=${tokens.ugliness} seed=${tokens.seed} usability=${tokens.usability} */`,
    ":root {",
    `  --ugly-seed: "${tokens.seed.replaceAll('"', '\\"')}";`,
    `  --ugly-level: ${tokens.ugliness};`,
  ];

  tokens.colors.forEach((value, index) => lines.push(`  --ugly-color-${index + 1}: ${value};`));
  tokens.fonts.forEach((value, index) => lines.push(`  --ugly-font-${index + 1}: ${value};`));
  tokens.borders.widthsPx.forEach((value, index) => lines.push(`  --ugly-border-width-${index + 1}: ${value}px;`));
  tokens.borders.styles.forEach((value, index) => lines.push(`  --ugly-border-style-${index + 1}: ${value};`));
  tokens.borders.radiiPx.forEach((value, index) => lines.push(`  --ugly-radius-${index + 1}: ${value}px;`));
  tokens.spacingPx.forEach((value, index) => lines.push(`  --ugly-space-${index + 1}: ${value}px;`));
  tokens.rotationsDeg.forEach((value, index) => lines.push(`  --ugly-rotate-${index + 1}: ${value}deg;`));
  tokens.offsetsPx.forEach((value, index) => lines.push(`  --ugly-offset-${index + 1}: ${value}px;`));
  tokens.shadows.forEach((value, index) => lines.push(`  --ugly-shadow-${index + 1}: ${value};`));
  tokens.motion.durationsMs.forEach((value, index) => lines.push(`  --ugly-duration-${index + 1}: ${value}ms;`));
  lines.push("}", "");
  return lines.join("\n");
}

function writeResult(content, options) {
  if (!options.output) {
    process.stdout.write(content);
    return;
  }
  const target = resolve(options.output);
  if (existsSync(target) && !options.overwrite) {
    throw new Error(`Output already exists: ${target}. Use --overwrite to replace it`);
  }
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
  process.stdout.write(`${target}\n`);
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      process.stdout.write(`${usage()}\n`);
      return;
    }
    if (options.listPresets) {
      const rows = Object.entries(PRESETS).map(([name, preset]) => `${name}\t${preset.description}`);
      process.stdout.write(`${rows.join("\n")}\n`);
      return;
    }
    const tokens = generateTokens(options);
    const content = options.format === "css" ? toCss(tokens) : `${JSON.stringify(tokens, null, 2)}\n`;
    writeResult(content, options);
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n\n${usage()}\n`);
    process.exitCode = 1;
  }
}

main();
