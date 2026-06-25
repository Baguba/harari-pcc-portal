'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LANGUAGES, type Language } from '@/lib/translations'
import { useLanguage } from '@/lib/LanguageContext'
import { Globe, Check, ChevronDown } from 'lucide-react'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="gap-1.5 h-9 border-[#D4A537]/40 hover:border-[#D4A537] hover:bg-[#FBF3E2]/40 text-[#1E3A5F]"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5 text-[#5B2A86]" />
        {!compact && <span className="text-xs font-medium">{current.label}</span>}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>

      {open && (
        <div
          className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-[#D4A537]/30 overflow-hidden z-50 fade-in-up"
          style={{ animationDuration: '0.15s' }}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Language)
                setOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-[#FBF3E2]/60 transition-colors ${
                lang === l.code ? 'bg-[#5B2A86]/5 text-[#5B2A86] font-semibold' : 'text-[#1E3A5F]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{l.flag}</span>
                <span>{l.label}</span>
              </span>
              {lang === l.code && <Check className="h-3.5 w-3.5 text-[#5B2A86]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
