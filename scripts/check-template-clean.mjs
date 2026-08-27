import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const forbidden = [/yet another zombie survivors/i, /yetanotherzombie/i, /yazs/i, /awesomegamesstudio/i, /2163330/, /ss_[a-f0-9]{12,}/i];
const skippedExtensions = new Set(['.woff', '.woff2', '.png', '.jpg', '.jpeg', '.webp', '.ico']);
const offenders = [];

function inspect(path) {
  const info = statSync(path);
  if (info.isDirectory()) {
    for (const entry of readdirSync(path)) inspect(join(path, entry));
    return;
  }
  if (skippedExtensions.has(path.slice(path.lastIndexOf('.')).toLowerCase())) return;
  const text = readFileSync(path, 'utf8');
  if (forbidden.some((pattern) => pattern.test(text))) offenders.push(path.replace(`${root}\\`, ''));
}

for (const relative of ['src', 'public', 'wrangler.toml', 'astro.config.ts']) inspect(join(root, relative));
if (offenders.length) throw new Error(`Template contains project-specific residue:\n${offenders.join('\n')}`);
console.log('Template cleanliness check passed.');
