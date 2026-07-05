import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const label = theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark');

  return (
    <button className="icon-toggle" onClick={toggleTheme} aria-label={label} title={label}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
