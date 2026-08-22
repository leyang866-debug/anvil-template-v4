# Anvil Template v2

A multilingual Astro game-wiki template extracted from a production game wiki. It retains the reusable production work: dark-theme token structure, responsive guide-card layouts, the game-data strip, practical CTA routing, SEO and i18n routes, and the `/sitemap.xml` compatibility index.

## Quick start

```bash
git clone https://github.com/leyang866-debug/anvil-template-v2.git new-project-name
cd new-project-name
pnpm install
pnpm dev
```

The local homepage intentionally displays `GAME_NAME` placeholders until you configure it.

## Reskin checklist

Change these five places before publishing:

1. `src/config/site.ts` — game name, domain, description, metadata, and social links.
2. `src/styles/globals.css` — the full visual palette.
3. `src/config/navigation.ts` — navigation labels, routes, and icons.
4. `src/content/wiki/en/` — English MDX guides.
5. `src/locales/` — translate the homepage and core guides for `vi`, `de`, `fr`, and `es`.

## Theme variables

Do not change only `--brand`. In `src/styles/globals.css`, replace the coordinated color groups for both `:root` and `.dark`:

- `--background`, `--foreground`, and `--muted` for page surfaces and text.
- `--card`, `--popover`, `--border`, and `--input` for panels and controls.
- `--brand`, `--nav`, `--link`, and their foreground variables for calls to action and navigation.

Keep readable contrast in both theme modes after changing these values.

## Content and assets

- Put the primary hero/OG image in `public/header.jpg`.
- Put supporting screenshots in `public/screenshot-N.jpg`.
- Replace favicon and app icons by copying your branded assets from `logo/` into `public/`.
- Put a YouTube identifier in `videos/youtube_id.txt` only if you add a trailer section to the homepage.
- Write MDX articles under `src/content/wiki/en/`; retain empty locale directories for translated entries.

## Deployment

Use the global deployment tool only. It creates the GitHub repository, Cloudflare Worker/domain setup, GA4, Search Console verification, and sitemap submission:

```bash
node C:\Users\Administrator\.claude\site-deploy\deploy-site.mjs \
  --source <project-path> --repo <owner/repo> --domain <domain>
```

Before deployment, replace the example values in `src/config/site.ts`, `wrangler.toml`, and the `SITE_URL` repository variable used by `.github/workflows/deploy-cloudflare-worker.yml`.

## Content rules

Follow `CLAUDE.md`: write direct player-facing guides rather than reference-note prose; expand every supported mechanic into usable instructions and tables; avoid unsupported claims; apply version labels where source material is version-specific.
