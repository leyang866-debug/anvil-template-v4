export interface NavigationItem {
  key: string;
  path: string;
  icon: string;
  isContentType: true;
  order?: number;
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  { key: 'guides', path: '/guides', icon: 'lucide:book-open', isContentType: true, order: 1 },
];

export const CONTENT_TYPES: string[] = ['guides', 'faq'];
export const NAV_BY_KEY: Record<string, NavigationItem> = Object.fromEntries(
  NAVIGATION_CONFIG.map((item) => [item.key, item]),
);
