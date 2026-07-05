/**
 * Splits a formatted price string into individual glyphs for a digit-roll
 * animation, pairing each glyph with a stable position key so a rolling
 * digit and a static separator (currency symbol, comma, period) can be
 * animated independently without remounting the whole string.
 */
export interface PriceGlyph {
  key: string;
  char: string;
  isDigit: boolean;
}

export function splitPriceGlyphs(formatted: string): PriceGlyph[] {
  return formatted.split('').map((char, index) => ({
    key: `${index}-${char}`,
    char,
    isDigit: /[0-9]/.test(char),
  }));
}
