export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'car-configurator-os:theme';

export function getStoredTheme(): Theme | null {
  if (typeof localStorage === 'undefined') return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

export function storeTheme(theme: Theme): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, theme);
}

export function getSystemPreferredTheme(): Theme | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null;
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return null;
}

/**
 * No stored choice yet: respect the OS preference if the browser reports
 * one, otherwise fall back to the app's own dark default.
 */
export function resolveInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return getSystemPreferredTheme() ?? 'dark';
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
}
