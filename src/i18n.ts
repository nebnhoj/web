import { createI18n } from 'vue-i18n'
import de from './locales/de.json'
import en from './locales/en.json'

const messages = {
  en,
  de
}

const getStartingLocale = () => {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export const createI18nInstance = () =>
  createI18n({
    legacy: false,
    locale: getStartingLocale(),
    fallbackLocale: 'en',
    messages
  })
