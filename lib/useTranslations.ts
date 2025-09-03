import { useTranslation } from 'react-i18next';

export function useTranslations(namespace: string = 'common') {
  const { t, i18n } = useTranslation(namespace);
  
  return {
    t,
    locale: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
}
