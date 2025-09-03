'use client'

import { I18nextProvider } from 'react-i18next'
import { useEffect, useState } from 'react'
import initI18next from '@/lib/i18n'
import { useLocale } from './LocaleProvider'

interface I18nProviderProps {
  children: React.ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const { locale } = useLocale()
  const [instance, setInstance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    initI18next(locale).then((i18nInstance) => {
      setInstance(i18nInstance)
      setIsLoading(false)
    })
  }, [locale])

  if (isLoading || !instance) {
    return <div className="min-h-screen bg-black" /> // Loading state
  }

  return (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  )
}
