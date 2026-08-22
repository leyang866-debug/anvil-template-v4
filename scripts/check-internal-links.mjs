import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const distDirectory = join(process.cwd(), 'dist');
if (!existsSync(distDirectory)) throw new Error(`Missing build output: ${distDirectory}`);

function findHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

function routeForHtmlFile(file) {
  const path = relative(distDirectory, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  return `/${path.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
}

const htmlFiles = findHtmlFiles(distDirectory);
const routes = new Set(htmlFiles.map(routeForHtmlFile));
const broken = [];
const ignoredAsset = /\.(?:css|js|map|png|jpe?g|webp|svg|ico|xml|txt|json|webmanifest)$/i;

for (const file of htmlFiles) {
  const sourceRoute = routeForHtmlFile(file);
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/g)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//') || ignoredAsset.test(href)) continue;
    const target = href.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';
    if (!routes.has(target)) broken.push(`${sourceRoute} -> ${href}`);
  }
}

if (broken.length) {
  throw new Error(`Broken internal links:\n${[...new Set(broken)].join('\n')}`);
}

console.log(`Internal link check passed: ${routes.size} routes scanned.`);
