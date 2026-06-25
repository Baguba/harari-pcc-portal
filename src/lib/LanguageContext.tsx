'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, type Language, type TranslationKey } from './translations'

interface LanguageContextValue {
  lang: Language
  setLang: (l: Language) => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'harari-pcc-lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null
      if (saved && ['en', 'am', 'or', 'har'].includes(saved)) {
        setLangState(saved)
      }
    } catch {
      // localStorage not available or error
    }
  }, [])

  const setLang = useCallback((l: Language) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const dict = translations[lang] || translations.en
      let value = (dict as Record<string, string>)[key] || (translations.en as Record<string, string>)[key] || String(key)
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
        }
      }
      return value
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Fallback when used outside provider (shouldn't happen, but defensive)
    return {
      lang: 'en' as Language,
      setLang: () => {},
      t: (key: TranslationKey) => (translations.en as Record<string, string>)[key] || String(key),
    }
  }
  return ctx
}
