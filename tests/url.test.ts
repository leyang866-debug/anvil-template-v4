import { describe, it, expect } from 'vitest';
import { localizePath, listPath, detailPath, homeUrl, localeFromPath } from '~/lib/url';

describe('localizePath', () => {
  it('returns the path unchanged for the default locale (en)', () => {
    expect(localizePath('/weapons', 'en')).toBe('/weapons');
    expect(localizePath('/weapons-tier-list', 'en')).toBe('/weapons-tier-list');
  });

  it('prepends the locale prefix for non-default locales', () => {
    expect(localizePath('/weapons', 'ru')).toBe('/ru/weapons');
    expect(localizePath('/weapons', 'de')).toBe('/de/weapons');
    expect(localizePath('/weapons', 'ja')).toBe('/ja/weapons');
  });

  it('ensures leading slash on input without one', () => {
    expect(localizePath('about', 'en')).toBe('/about');
    expect(localizePath('about', 'ru')).toBe('/ru/about');
  });
});

describe('homeUrl', () => {
  it('returns / for default locale', () => {
    expect(homeUrl('en')).toBe('/');
  });
  it('returns prefixed roots for non-default locales', () => {
    expect(homeUrl('ru')).toBe('/ru');
    expect(homeUrl('de')).toBe('/de');
    expect(homeUrl('ja')).toBe('/ja');
  });
});

describe('listPath', () => {
  it('builds the correct list URL for each locale', () => {
    expect(listPath('guides', 'en')).toBe('/guides');
    expect(listPath('guides', 'de')).toBe('/de/guides');
    expect(listPath('guides', 'ja')).toBe('/ja/guides');
  });
});

describe('detailPath', () => {
  it('builds the correct article URL for each locale', () => {
    expect(detailPath('guides', 'weapons', 'en')).toBe('/weapons');
    expect(detailPath('guides', 'weapons', 'ru')).toBe('/ru/weapons');
  });

  it('keeps flat nested slugs when present', () => {
    expect(detailPath('guides', 'updates/1.0', 'en')).toBe('/updates/1.0');
    expect(detailPath('guides', 'updates/1.0', 'ja')).toBe('/ja/updates/1.0');
  });

  it('maps the 1.0 guide slug to its public URL', () => {
    expect(detailPath('guides', '10-update', 'en')).toBe('/1.0-update');
    expect(detailPath('guides', '10-update', 'ru')).toBe('/ru/1.0-update');
  });
});

describe('localeFromPath', () => {
  it('extracts the locale from a prefixed path', () => {
    expect(localeFromPath('/ru/weapons')).toBe('ru');
    expect(localeFromPath('/de')).toBe('de');
    expect(localeFromPath('/ja/weapons')).toBe('ja');
  });

  it('returns the default locale when no prefix is present', () => {
    expect(localeFromPath('/weapons')).toBe('en');
    expect(localeFromPath('/')).toBe('en');
    expect(localeFromPath('')).toBe('en');
  });
});
