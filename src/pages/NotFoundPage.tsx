import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main
      className="light-surface"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>{t('common.notFoundCode')}</h1>
      <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-lg)' }}>
        {t('common.pageNotFound')}
      </p>
      <Link to="/" className="btn btn-secondary">
        {t('common.backToHome')}
      </Link>
    </main>
  );
}
