import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const htmlFiles = [];
function walk(dir) { for (const entry of readdirSync(dir, { withFileTypes: true })) { const file = join(dir, entry.name); if (entry.isDirectory()) walk(file); else if (entry.name.endsWith('.html')) htmlFiles.push(file); } }
walk(dist);
const failures = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const paragraphs = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gs)].map((match) => match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter((text) => text.length > 80);
  const counts = new Map();
  for (const paragraph of paragraphs) counts.set(paragraph, (counts.get(paragraph) ?? 0) + 1);
  for (const [paragraph, count] of counts) if (count > 1) failures.push(`${file}: repeated paragraph ${count}x: ${paragraph.slice(0, 100)}`);
}
if (failures.length) throw new Error(`Content repetition check failed:\n${failures.join('\n')}`);
console.log(`Content repetition check passed: ${htmlFiles.length} pages scanned.`);
