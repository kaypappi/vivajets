import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

const initI18next = async (locale: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`../public/locales/${language}/${namespace}.json`)))
    .init({
      lng: locale,
      fallbackLng: 'en',
      supportedLngs: ['en', 'fr'],
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common'],
      debug: false,
    })
  return i18nInstance
}

export default initI18next
