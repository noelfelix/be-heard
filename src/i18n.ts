import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { getPath } from './const/globals'

i18n
  .use(LanguageDetector)
  .use(Backend)
  .init({
    backend: {
      loadPath: `${getPath()}/static/locales/{{lng}}.json`,
      allowMultiLoading: false,
      reloadInterval: false,
    },
    fallbackLng: 'en',
    debug: false,

    // have a common namespace used around the full App
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
      useSuspense: false,
    },
  })

export default i18n
