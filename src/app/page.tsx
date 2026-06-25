'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Landing } from '@/components/landing/Landing'
import { AuthCard } from '@/components/auth/AuthCard'
import { ApplicantDashboard } from '@/components/applicant/ApplicantDashboard'
import { ReviewerDashboard } from '@/components/reviewer/ReviewerDashboard'
import { HarariLoader } from '@/components/harari/Emblem'
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext'

type View = 'landing' | 'auth'

function HomeContent() {
  const { user, loading, logout, refresh } = useAuth()
  const { t } = useLanguage()
  const [view, setView] = useState<View>('landing')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF3E2] harari-pattern-bg">
        <div className="text-center fade-in-up">
          <HarariLoader size={140} label={t('common.loading')} />
        </div>
      </div>
    )
  }

  // If logged in, show the appropriate dashboard
  if (user) {
    if (user.role === 'APPLICANT') {
      return (
        <ApplicantDashboard
          user={user}
          onLogout={async () => {
            await logout()
            refresh()
          }}
          onNavigateHome={() => {
            /* already in dashboard */
          }}
        />
      )
    }
    if (user.role === 'REVIEWER' || user.role === 'ADMIN') {
      return (
        <ReviewerDashboard
          user={user}
          onLogout={async () => {
            await logout()
            refresh()
          }}
          onNavigateHome={() => {
            /* already in dashboard */
          }}
        />
      )
    }
  }

  // If not logged in: show landing or auth
  if (view === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBF3E2] via-[#FFFBF0] to-[#FBF3E2] p-4 harari-pattern-bg">
        <div className="w-full max-w-md fade-in-up">
          <button
            onClick={() => setView('landing')}
            className="text-sm text-muted-foreground hover:text-[#5B2A86] mb-4 flex items-center gap-1 mx-auto"
          >
            {t('auth.back')}
          </button>
          <AuthCard onAuthenticated={refresh} />
        </div>
      </div>
    )
  }

  return (
    <Landing
      onApply={() => setView('auth')}
      onLogin={() => setView('auth')}
    />
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  )
}
