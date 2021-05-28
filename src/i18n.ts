import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
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
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // passes i18n down to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'fr', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
