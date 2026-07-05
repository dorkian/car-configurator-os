import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  getStoredTheme,
  storeTheme,
  getSystemPreferredTheme,
  resolveInitialTheme,
  applyTheme,
} from '../lib/theme/theme';

function mockMatchMedia(prefersLight: boolean | null) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: prefersLight === null ? false : query.includes('light') ? prefersLight : !prefersLight,
    media: query,
  })) as unknown as typeof window.matchMedia;
}

describe('theme persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null from getStoredTheme when nothing is stored', () => {
    expect(getStoredTheme()).toBeNull();
  });

  it('round-trips a stored theme via storeTheme/getStoredTheme', () => {
    storeTheme('light');
    expect(getStoredTheme()).toBe('light');
    storeTheme('dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('ignores corrupted localStorage values', () => {
    localStorage.setItem('car-configurator-os:theme', 'not-a-theme');
    expect(getStoredTheme()).toBeNull();
  });

  it('detects an OS light preference via matchMedia', () => {
    mockMatchMedia(true);
    expect(getSystemPreferredTheme()).toBe('light');
  });

  it('detects an OS dark preference via matchMedia', () => {
    mockMatchMedia(false);
    expect(getSystemPreferredTheme()).toBe('dark');
  });

  it('resolveInitialTheme prefers a stored choice over the OS preference', () => {
    mockMatchMedia(true); // OS says light
    storeTheme('dark'); // but user previously chose dark
    expect(resolveInitialTheme()).toBe('dark');
  });

  it('resolveInitialTheme respects the OS light preference on first visit (no stored choice)', () => {
    mockMatchMedia(true);
    expect(resolveInitialTheme()).toBe('light');
  });

  it('resolveInitialTheme falls back to dark when there is no stored choice and no OS signal', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
    })) as unknown as typeof window.matchMedia;
    expect(resolveInitialTheme()).toBe('dark');
  });

  it('applyTheme sets the data-theme attribute on the document root', () => {
    applyTheme('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    applyTheme('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
