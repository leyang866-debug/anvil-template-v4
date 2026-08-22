# Fixed template rules

This fork is the cleaned seed for new game wiki sites.

## Route contract

- `/guides` is the default content directory.
- Article paths are generated from `src/content/wiki/en/<category>/<slug>.mdx`.
- Homepage and navigation links must point to real routes.
- Do not add a navigation category until its overview route or first article exists.

## Build gate

`pnpm build` runs `scripts/check-internal-links.mjs` after Astro and Pagefind. It scans every generated HTML file and fails on an internal `href` that does not map to a generated route.

## New game setup

1. Replace `src/config/site.ts` values, including `domain`.
2. Replace `src/locales/en.json` content and links.
3. Add MDX under `src/content/wiki/en/<category>/`.
4. Update `src/config/navigation.ts` only for categories with real content.
5. Add images under `public/images/` and reference them from frontmatter.
6. Run `pnpm build` before deployment.

The default `example.com` domain intentionally fails the prebuild check so a new site cannot publish an incorrect sitemap.
