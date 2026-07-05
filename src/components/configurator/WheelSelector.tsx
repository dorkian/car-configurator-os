import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Wheel } from '../../types/catalog';
import { formatPrice } from '../../lib/formatters/price';

interface Props {
  wheels: Wheel[];
  selectedWheelId: string;
  onSelect: (wheelId: string) => void;
}

function WheelImage({ src, alt, size }: { src: string; alt: string; size: number }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="wheel-card__placeholder">
        {size}"
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setError(true)} />;
}

export default function WheelSelector({ wheels, selectedWheelId, onSelect }: Props) {
  const { t, i18n } = useTranslation();

  if (wheels.length === 0) return <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>{t('empty.noWheels')}</p>;

  return (
    <div className="wheel-grid">
      {wheels.map((wheel) => (
        <button
          key={wheel.id}
          className={`wheel-card${selectedWheelId === wheel.id ? ' wheel-card--selected' : ''}`}
          onClick={() => onSelect(wheel.id)}
          aria-pressed={selectedWheelId === wheel.id}
          aria-label={`${wheel.name} — ${wheel.size}" ${wheel.priceModifier ? `+${formatPrice(wheel.priceModifier, i18n.language)}` : t('pricing.included')}`}
        >
          <div className="wheel-card__image">
            <WheelImage src={wheel.image} alt={wheel.name} size={wheel.size} />
          </div>
          <div className="wheel-card__name">{wheel.name}</div>
          <div className="wheel-card__price">
            {wheel.priceModifier ? `+${formatPrice(wheel.priceModifier, i18n.language)}` : t('pricing.included')}
          </div>
        </button>
      ))}
    </div>
  );
}
