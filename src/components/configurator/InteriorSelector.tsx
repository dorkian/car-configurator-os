import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Interior } from '../../types/catalog';
import { formatPrice } from '../../lib/formatters/price';

interface Props {
  interiors: Interior[];
  selectedInteriorId: string;
  onSelect: (interiorId: string) => void;
}

function InteriorThumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return <div className="interior-card__thumbnail-placeholder" aria-hidden />;
  }
  return (
    <img
      className="interior-card__thumbnail"
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}

export default function InteriorSelector({ interiors, selectedInteriorId, onSelect }: Props) {
  const { t, i18n } = useTranslation();

  if (interiors.length === 0) return <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>{t('empty.noInteriors')}</p>;

  return (
    <div className="interior-grid">
      {interiors.map((interior) => (
        <button
          key={interior.id}
          className={`interior-card${selectedInteriorId === interior.id ? ' interior-card--selected' : ''}`}
          onClick={() => onSelect(interior.id)}
          aria-pressed={selectedInteriorId === interior.id}
          aria-label={`${interior.name} — ${t(`material.${interior.material}`)}${interior.priceModifier ? ` +${formatPrice(interior.priceModifier, i18n.language)}` : ` ${t('pricing.included')}`}`}
        >
          <InteriorThumbnail src={interior.thumbnail} alt={`${interior.name} interior`} />
          <span className="interior-card__material-tag">{t(`material.${interior.material}`)}</span>
          <div className="interior-card__name">{interior.name}</div>
          <div className="interior-card__price">
            {interior.priceModifier ? `+${formatPrice(interior.priceModifier, i18n.language)}` : t('pricing.included')}
          </div>
        </button>
      ))}
    </div>
  );
}
