import { describe, it, expect } from 'vitest';
import {
  localizePath,
  listPath,
  detailPath,
  homeUrl,
  localeFromPath,
} from '~/lib/url';

describe('localizePath', () => {
  it('returns the path unchanged for the default locale (en)', () => {
    expect(localizePath('/weapons', 'en')).toBe('/weapons');
    expect(localizePath('/weapons-tier-list', 'en')).toBe('/weapons-tier-list');
  });

  it('prepends the locale prefix for non-default locales', () => {
    expect(localizePath('/weapons', 'vi')).toBe('/vi/weapons');
    expect(localizePath('/weapons', 'de')).toBe('/de/weapons');
    expect(localizePath('/weapons', 'fr')).toBe('/fr/weapons');
    expect(localizePath('/weapons', 'es')).toBe('/es/weapons');
  });

  it('ensures leading slash on input without one', () => {
    expect(localizePath('about', 'en')).toBe('/about');
    expect(localizePath('about', 'vi')).toBe('/vi/about');
  });
});

describe('homeUrl', () => {
  it('returns / for default locale', () => {
    expect(homeUrl('en')).toBe('/');
  });
  it('returns prefixed roots for non-default locales', () => {
    expect(homeUrl('vi')).toBe('/vi');
    expect(homeUrl('de')).toBe('/de');
    expect(homeUrl('fr')).toBe('/fr');
    expect(homeUrl('es')).toBe('/es');
  });
});

describe('listPath', () => {
  it('builds the correct list URL for each locale', () => {
    expect(listPath('guides', 'en')).toBe('/guides');
    expect(listPath('guides', 'de')).toBe('/de/guides');
    expect(listPath('guides', 'es')).toBe('/es/guides');
  });
});

describe('detailPath', () => {
  it('builds the correct article URL for each locale', () => {
    expect(detailPath('guides', 'weapons', 'en')).toBe('/weapons');
    expect(detailPath('guides', 'weapons', 'fr')).toBe('/fr/weapons');
  });

  it('keeps flat nested slugs when present', () => {
    expect(detailPath('guides', 'updates/1.0', 'en')).toBe('/updates/1.0');
    expect(detailPath('guides', 'updates/1.0', 'es')).toBe('/es/updates/1.0');
  });

  it('maps the 1.0 guide slug to its public URL', () => {
    expect(detailPath('guides', '10-update', 'en')).toBe('/1.0-update');
    expect(detailPath('guides', '10-update', 'vi')).toBe('/vi/1.0-update');
  });
});

describe('localeFromPath', () => {
  it('extracts the locale from a prefixed path', () => {
    expect(localeFromPath('/vi/weapons')).toBe('vi');
    expect(localeFromPath('/de')).toBe('de');
    expect(localeFromPath('/fr/weapons')).toBe('fr');
    expect(localeFromPath('/es/weapons')).toBe('es');
  });

  it('returns the default locale when no prefix is present', () => {
    expect(localeFromPath('/weapons')).toBe('en');
    expect(localeFromPath('/')).toBe('en');
    expect(localeFromPath('')).toBe('en');
  });
});