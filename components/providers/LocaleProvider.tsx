'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LocaleContextType {
  locale: string
  setLocale: (locale: string) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children, initialLocale = 'en' }: { children: ReactNode; initialLocale?: string }) {
  const [locale, setLocale] = useState(initialLocale)

  // Load locale from localStorage on mount
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('vivaJetsLocale')
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'fr')) {
        setLocale(savedLocale)
      } else {
        // Detect browser language if no saved preference
        const browserLang = navigator.language.toLowerCase()
        if (browserLang.startsWith('fr')) {
          setLocale('fr')
          localStorage.setItem('vivaJetsLocale', 'fr')
        }
      }
    } catch (error) {
      // Handle cases where localStorage is not available (SSR)
      console.warn('localStorage not available:', error)
    }
  }, [])

  // Save locale to localStorage when it changes
  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale)
    try {
      localStorage.setItem('vivaJetsLocale', newLocale)
    } catch (error) {
      console.warn('Could not save locale to localStorage:', error)
    }
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
