import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import it from './locales/it/translation.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'it'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'car-configurator-os:language',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
