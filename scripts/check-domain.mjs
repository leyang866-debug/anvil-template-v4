#!/usr/bin/env node
/**
 * Pre-build domain checker.
 * Fails the build if site.ts still uses the template default domain.
 * This is ENFORCEMENT, not a suggestion — the AI cannot bypass it.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const configPath = resolve(import.meta.dirname, '../src/config/site.ts');
const content = readFileSync(configPath, 'utf8');

// Match domain: 'xxxxx' in the site config
const match = content.match(/domain:\s*'([^']+)'/);

if (!match) {
  console.error('\n❌ FATAL: Could not read domain from src/config/site.ts');
  process.exit(1);
}

const domain = match[1];

if (domain === 'example.com') {
  console.error('\n❌ FATAL: Domain is still "example.com" (template default).');
  console.error('   Build would generate sitemap with wrong URLs → Google shows "cannot fetch".');
  console.error('\n   Fix: sed -i "s|domain: \'example.com\'|domain: \'你的真实域名\'|" src/config/site.ts');
  console.error('   Then re-run the build.\n');
  process.exit(1);
}

console.log(`✅ Domain check passed: ${domain}`);
process.exit(0);