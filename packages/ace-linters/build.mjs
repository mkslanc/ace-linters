#!/usr/bin/env node
/**
 * Build script for ace-linters
 * Builds each entry point as a separate UMD bundle
 *
 * Usage:
 *   node build.mjs        # Production build (no sourcemaps)
 *   node build.mjs --dev  # Development build (inline sourcemaps)
 */

import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';

const isDev = process.argv.includes('--dev');
const nodeEnv = isDev ? 'development' : 'production';

const entries = [
  'ace-linters',
  'service-manager',
  'html-service',
  'css-service',
  'json-service',
  'lua-service',
  'typescript-service',
  'yaml-service',
  'xml-service',
  'php-service',
  'ace-language-client',
  'javascript-service',
  'base-service',
  'language-client',
];

if (existsSync('build')) {
  rmSync('build', { recursive: true });
}

console.log(`Building ace-linters with Vite (UMD) [${isDev ? 'development' : 'production'}]...\n`);

for (const entry of entries) {
  console.log(`Building ${entry}...`);
  try {
    execSync(`npx vite build`, {
      stdio: 'inherit',
      env: { ...process.env, ENTRY: entry, NODE_ENV: nodeEnv },
    });
  } catch (err) {
    console.error(`Failed to build ${entry}`);
    process.exit(1);
  }
}

console.log('\nAll builds complete!');
