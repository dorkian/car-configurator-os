import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { splitPriceGlyphs } from '../../lib/formatters/priceDigits';

interface Props {
  value: string;
  className?: string;
}

export default function PriceRoll({ value, className }: Props) {
  const reduceMotion = useReducedMotion();
  const glyphs = splitPriceGlyphs(value);

  if (reduceMotion) {
    return (
      <span className={className} aria-live="polite">
        {value}
      </span>
    );
  }

  return (
    <span className={className} aria-live="polite" style={{ display: 'inline-flex', overflow: 'hidden' }}>
      {glyphs.map((glyph) => (
        <span key={glyph.key} style={{ display: 'inline-block', overflow: 'hidden', height: '1.1em', position: 'relative' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={glyph.char}
              initial={glyph.isDigit ? { y: '100%', opacity: 0 } : { opacity: 1 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={glyph.isDigit ? { y: '-100%', opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block' }}
            >
              {glyph.char === ' ' ? ' ' : glyph.char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
