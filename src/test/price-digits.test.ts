import { describe, it, expect } from 'vitest';
import { splitPriceGlyphs } from '../lib/formatters/priceDigits';

describe('splitPriceGlyphs', () => {
  it('splits every character including symbols and separators', () => {
    const glyphs = splitPriceGlyphs('$42,000');
    expect(glyphs.map((g) => g.char)).toEqual(['$', '4', '2', ',', '0', '0', '0']);
  });

  it('marks digit characters as isDigit true', () => {
    const glyphs = splitPriceGlyphs('$42,000');
    expect(glyphs.find((g) => g.char === '4')?.isDigit).toBe(true);
  });

  it('marks non-digit characters as isDigit false', () => {
    const glyphs = splitPriceGlyphs('$42,000');
    expect(glyphs.find((g) => g.char === '$')?.isDigit).toBe(false);
    expect(glyphs.find((g) => g.char === ',')?.isDigit).toBe(false);
  });

  it('produces unique keys per position even with repeated characters', () => {
    const glyphs = splitPriceGlyphs('$0,000');
    const keys = glyphs.map((g) => g.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('handles euro-formatted prices with different symbol placement', () => {
    const glyphs = splitPriceGlyphs('42.000 €');
    expect(glyphs.map((g) => g.char)).toEqual(['4', '2', '.', '0', '0', '0', ' ', '€']);
    expect(glyphs.find((g) => g.char === '€')?.isDigit).toBe(false);
  });

  it('returns an empty array for an empty string', () => {
    expect(splitPriceGlyphs('')).toEqual([]);
  });
});
