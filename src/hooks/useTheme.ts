import { useEffect, useState } from 'react';
import { applyTheme, resolveInitialTheme, storeTheme, type Theme } from '../lib/theme/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => resolveInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    storeTheme(next);
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, setTheme, toggleTheme };
}
