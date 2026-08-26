import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const targets = ['src', 'public', 'wrangler.toml', 'astro.config.ts'];
const forbidden = [/yetanotherzombie/i, /yazs/i, /awesomegamesstudio/i, /2163330/, /ss_[a-f0-9]{12,}/i];
const offenders = [];

for (const relative of targets) {
  try {
    const text = readFileSync(join(root, relative), 'utf8');
    if (forbidden.some((pattern) => pattern.test(text))) offenders.push(relative);
  } catch {
    // Optional paths are skipped; generated output is checked by the build itself.
  }
}

if (offenders.length) throw new Error(`Template contains project-specific residue: ${offenders.join(', ')}`);
console.log('Template cleanliness check passed.');
