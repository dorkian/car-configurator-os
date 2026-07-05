import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { decodeBuild } from '../lib/url-state/codec';
import { validateBuild } from '../features/rules';
import { computePrice } from '../features/pricing';
import { formatPrice } from '../lib/formatters/price';
import { getCars } from '../services/catalog.service';

export default function BuildSummaryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const param = searchParams.get('b');
  const decoded = param ? decodeBuild(param) : null;

  if (!decoded) return <Navigate to="/" replace />;

  const validated = validateBuild(decoded);
  const car = getCars().find((c) => c.id === validated.carId);
  if (!car) return <Navigate to="/" replace />;

  const price = computePrice(validated);

  return (
    <main className="light-surface spec-sheet">
      <button className="spec-sheet__back" onClick={() => navigate(-1)}>
        {t('summary.backToConfigurator')}
      </button>

      <img className="spec-sheet__hero" src={car.heroImage} alt={car.name} />

      <p className="spec-sheet__eyebrow">{t('nav.configuratorLabel')}</p>
      <h1 className="spec-sheet__title">
        {t('summary.title', { carName: car.name })}
      </h1>

      <div className="spec-sheet__items">
        {price.lineItems.map((item) => (
          <div key={item.label} className="spec-sheet__item">
            <span className="spec-sheet__item-label">{item.label}</span>
            <span className="spec-sheet__item-value">{formatPrice(item.price, i18n.language)}</span>
          </div>
        ))}
      </div>

      <div className="spec-sheet__total">
        <span className="spec-sheet__total-label">{t('common.total')}</span>
        <span className="spec-sheet__total-value">{formatPrice(price.totalPrice, i18n.language)}</span>
      </div>

      <p className="spec-sheet__signature">{t('summary.signature')}</p>
    </main>
  );
}
