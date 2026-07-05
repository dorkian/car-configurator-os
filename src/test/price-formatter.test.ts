import { describe, it, expect } from 'vitest';
import { formatPrice } from '../lib/formatters/price';

describe('formatPrice', () => {
  it('defaults to USD formatting when no locale is given', () => {
    expect(formatPrice(4200000)).toBe('$42,000');
  });

  it('formats USD for an explicit en-US locale', () => {
    expect(formatPrice(4200000, 'en-US')).toBe('$42,000');
  });

  it('formats EUR for an it-IT locale', () => {
    const result = formatPrice(4200000, 'it-IT');
    expect(result).toContain('42.000');
    expect(result).toMatch(/€/);
  });

  it('maps a bare "it" language tag to EUR currency', () => {
    const result = formatPrice(4200000, 'it');
    expect(result).toMatch(/€/);
  });

  it('maps a bare "en" language tag to USD currency', () => {
    const result = formatPrice(4200000, 'en');
    expect(result).toMatch(/\$/);
  });

  it('falls back to USD for an unrecognized locale', () => {
    const result = formatPrice(4200000, 'fr-FR');
    expect(result).toMatch(/\$|USD/);
  });

  it('rounds to whole currency units (no decimal cents)', () => {
    expect(formatPrice(4200050, 'en-US')).not.toContain('.');
  });
});
