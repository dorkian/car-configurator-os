import { useTranslation } from 'react-i18next';
import type { Trim } from '../../types/catalog';
import { formatPrice } from '../../lib/formatters/price';

interface Props {
  trims: Trim[];
  selectedTrimId: string;
  onSelect: (trimId: string) => void;
}

export default function TrimSelector({ trims, selectedTrimId, onSelect }: Props) {
  const { t, i18n } = useTranslation();

  if (trims.length === 0) return <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>{t('empty.noTrims')}</p>;

  return (
    <div className="trim-grid">
      {trims.map((trim) => (
        <button
          key={trim.id}
          className={`trim-card${selectedTrimId === trim.id ? ' trim-card--selected' : ''}`}
          onClick={() => onSelect(trim.id)}
          aria-pressed={selectedTrimId === trim.id}
          aria-label={`${trim.name} trim — ${trim.priceModifier === 0 ? t('pricing.included') : `+${formatPrice(trim.priceModifier, i18n.language)}`}`}
        >
          <div className="trim-card__name">{trim.name}</div>
          <div className="trim-card__price">
            {trim.priceModifier === 0 ? (
              <span className="trim-card__price--included">{t('pricing.included')}</span>
            ) : (
              `+${formatPrice(trim.priceModifier, i18n.language)}`
            )}
          </div>
          <ul className="trim-card__features">
            {trim.features.slice(0, 4).map((f) => (
              <li key={f} className="trim-card__feature">{f}</li>
            ))}
            {trim.features.length > 4 && (
              <li className="trim-card__feature" style={{ color: 'var(--color-neutral-600)' }}>
                {t('trim.moreFeatures', { count: trim.features.length - 4 })}
              </li>
            )}
          </ul>
        </button>
      ))}
    </div>
  );
}
