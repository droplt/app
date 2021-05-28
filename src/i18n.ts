import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      ADMIN: 'Admin',
      VISITOR: 'Visitor',
      CONTRIBUTOR: 'Contributor',
    },
  },
  fr: {
    translation: {
      ADMIN: 'Administrateur',
      VISITOR: 'Visiteur',
      CONTRIBUTOR: 'Contributeur',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
