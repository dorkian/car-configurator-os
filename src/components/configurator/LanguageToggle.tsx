import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isItalian = i18n.language.startsWith('it');
  const next = isItalian ? 'en' : 'it';

  return (
    <button
      className="icon-toggle"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={t('language.label')}
      title={t('language.label')}
    >
      {isItalian ? 'EN' : 'IT'}
    </button>
  );
}
