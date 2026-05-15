#!/usr/bin/env node
import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';

const entries = [
  'mysql-service',
  'pgsql-service',
  'flinksql-service',
  'hivesql-service',
  'impalasql-service',
  'sparksql-service',
  'trinosql-service',
];

// Clean build directory
if (existsSync('build')) {
  rmSync('build', { recursive: true });
}

console.log('Building ace-sql-linter with Vite (UMD)...\n');

for (const entry of entries) {
  console.log(`Building ${entry}...`);
  try {
    execSync(`npx vite build`, {
      stdio: 'inherit',
      env: { ...process.env, ENTRY: entry },
    });
  } catch (err) {
    console.error(`Failed to build ${entry}`);
    process.exit(1);
  }
}

console.log('\nAll builds complete!');
