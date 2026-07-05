import { useTranslation } from 'react-i18next';
import type { Color } from '../../types/catalog';
import { formatPrice } from '../../lib/formatters/price';

interface Props {
  colors: Color[];
  selectedColorId: string;
  onSelect: (colorId: string) => void;
}

export default function ColorSelector({ colors, selectedColorId, onSelect }: Props) {
  const { t, i18n } = useTranslation();

  if (colors.length === 0) return <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>{t('empty.noColors')}</p>;

  return (
    <div className="color-swatches">
      {colors.map((color) => (
        <button
          key={color.id}
          className="color-swatch-wrap"
          onClick={() => onSelect(color.id)}
          aria-label={`${color.name} — ${t(`colorType.${color.type}`)}${color.priceModifier ? ` +${formatPrice(color.priceModifier, i18n.language)}` : ` ${t('pricing.included')}`}`}
          aria-pressed={selectedColorId === color.id}
          title={color.name}
        >
          <span
            className={`color-swatch${selectedColorId === color.id ? ' color-swatch--selected' : ''}`}
            style={{ background: color.hex }}
          />
          <span className="color-swatch__label">{color.name}</span>
          <span className="color-swatch__price">
            {color.priceModifier ? `+${formatPrice(color.priceModifier, i18n.language)}` : '—'}
          </span>
        </button>
      ))}
    </div>
  );
}
