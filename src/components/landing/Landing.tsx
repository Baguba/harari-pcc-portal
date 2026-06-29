'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HarariStar, HarariBorder, HarariGeoPattern } from '@/components/harari/Decorations'
import { HarariEmblem } from '@/components/harari/Emblem'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { useLanguage } from '@/lib/LanguageContext'
import {
  FileText, ShieldCheck, Building2, Clock, CheckCircle2, MapPin,
  Award, ArrowRight, BookOpen, Users, Bell, Lock, Newspaper,
  ChevronLeft, ChevronRight, Info
} from 'lucide-react'

interface LandingProps {
  onApply: () => void
  onLogin: () => void
}

export function Landing({ onApply, onLogin }: LandingProps) {
  const { t } = useLanguage()
  // Translated steps + features
  const STEPS = [
    { title: t('how.step1.title'), desc: t('how.step1.desc'), icon: Users, bg: 'bg-[#5B2A86]' },
    { title: t('how.step2.title'), desc: t('how.step2.desc'), icon: FileText, bg: 'bg-[#D4A537]' },
    { title: t('how.step3.title'), desc: t('how.step3.desc'), icon: BookOpen, bg: 'bg-[#B5471A]' },
    { title: t('how.step4.title'), desc: t('how.step4.desc'), icon: Award, bg: 'bg-[#2E7A5A]' },
  ]
  const FEATURES = [
    { title: t('features.online.title'), desc: t('features.online.desc'), icon: Clock },
    { title: t('features.secure.title'), desc: t('features.secure.desc'), icon: Lock },
    { title: t('features.assessment.title'), desc: t('features.assessment.desc'), icon: ShieldCheck },
    { title: t('features.tracking.title'), desc: t('features.tracking.desc'), icon: Bell },
    { title: t('features.verifiable.title'), desc: t('features.verifiable.desc'), icon: CheckCircle2 },
    { title: t('features.compliance.title'), desc: t('features.compliance.desc'), icon: Building2 },
  ]

  // ── News carousel data (add more items here to update the slideshow) ──
  const NEWS_ITEMS = [
    {
      image: '/news-1.jpg',
      title: t('news.item1.title'),
      description: t('news.item1.desc'),
      date: t('news.item1.date'),
    },
    {
      image: '/news-2.jpg',
      title: t('news.item2.title'),
      description: t('news.item2.desc'),
      date: t('news.item2.date'),
    },
  ]

  // ── Carousel state ──
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = NEWS_ITEMS.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])


  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader onLogin={onLogin} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient text-white">
          <HarariGeoPattern className="absolute inset-0 opacity-20" opacity={0.2} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-6 fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm border border-[#D4A537]/50">
                  <MapPin className="h-3.5 w-3.5 text-[#D4A537]" />
                  <span className="text-[#FBF3E2]">{t('landing.hero.badge')}</span>
                </div>
                <h1
                  className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
                  style={{ fontWeight: 600 }}
                >
                  {t('landing.hero.title').split(t('landing.hero.title.highlight'))[0]}
                  <span className="text-[#D4A537]">{t('landing.hero.title.highlight')}</span>
                  {t('landing.hero.title').split(t('landing.hero.title.highlight'))[1] || ''}
                </h1>
                <p className="text-lg text-[#FBF3E2]/90 max-w-xl">
                  {t('landing.hero.description')}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    size="lg"
                    onClick={onApply}
                    className="bg-[#D4A537] hover:bg-[#B5471A] text-[#1E3A5F] font-semibold"
                  >
                    {t('landing.hero.cta.apply')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={onLogin}
                    className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white"
                  >
                    {t('landing.hero.cta.login')}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-6 pt-6 text-sm">
                  <div>
                    <div className="text-3xl font-bold text-[#D4A537]" style={{ fontWeight: 600 }}>5</div>
                    <div className="text-[#FBF3E2]/80">{t('landing.hero.stat.days')}</div>
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <div className="text-3xl font-bold text-[#D4A537]" style={{ fontWeight: 600 }}>100%</div>
                    <div className="text-[#FBF3E2]/80">{t('landing.hero.stat.online')}</div>
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <div className="text-3xl font-bold text-[#D4A537]" style={{ fontWeight: 600 }}>2 Yrs</div>
                    <div className="text-[#FBF3E2]/80">{t('landing.hero.stat.validity')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Color stripe at bottom */}
          <div className="harari-stripe h-2" />
        </section>

        {/* Process Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-[#FBF3E2] scroll-mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#5B2A86]/10 px-4 py-1 text-sm text-[#5B2A86] mb-3">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{t('how.title')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1E3A5F]" style={{ fontWeight: 600 }}>
                {t('how.heading')}
              </h2>
              <p className="text-muted-foreground">
                {t('how.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <Card key={i} className="relative border-2 border-[#D4A537]/20 hover:border-[#D4A537]/60 hover:shadow-lg transition-all bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${step.bg}`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-5xl font-bold text-[#D4A537]/20" style={{ fontWeight: 600 }}>
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#1E3A5F]">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ News & Updates Slideshow (Atmospheric) ═══ */}
        <section id="news" className="relative bg-[#0B1221] text-white scroll-mt-16 overflow-hidden">
          {/* Subtle atmospheric background pattern/glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E3A5F]/20 via-[#0B1221] to-[#0B1221] opacity-60" />
          
          <div className="relative pt-12 md:pt-20">
            <div className="container mx-auto px-4 relative z-10">
              {/* Section header */}
              <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm text-[#D4A537] mb-4 border border-white/10 shadow-lg">
                  <Newspaper className="h-4 w-4" />
                  <span className="font-medium tracking-wide uppercase">{t('news.badge')}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight" style={{ fontWeight: 600 }}>
                  {t('news.title')}
                </h2>
                <p className="text-white/70 text-lg">
                  {t('news.subtitle')}
                </p>
              </div>
            </div>

            {/* Slideshow (Edge-to-Edge) */}
            <div className="relative w-full">
              {/* Carousel container */}
              <div className="relative overflow-hidden bg-[#0B1221] h-[400px] md:h-[550px]">
                <div
                  className="flex transition-transform duration-1000 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {NEWS_ITEMS.map((item, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 relative group">
                      {/* Background Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                      />
                      {/* Atmospheric gradients to blend edges seamlessly */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-[#0B1221] opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/60 to-transparent" />
                      
                      {/* Overlaid Content Container (Aligned with container) */}
                      <div className="absolute inset-0 flex flex-col justify-center">
                        <div className="container mx-auto px-4">
                          <div className="max-w-2xl flex flex-col items-start">
                            <div className="inline-flex items-center gap-2 text-sm text-[#D4A537] font-bold mb-4 tracking-widest uppercase">
                              <Newspaper className="h-4 w-4" />
                              {item.date}
                            </div>
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontWeight: 600 }}>
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-lg text-white/80 leading-relaxed line-clamp-3 mb-4 max-w-xl">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Previous / Next buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all z-10"
                  aria-label="Previous news"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all z-10"
                  aria-label="Next news"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Dot indicators positioned over the bottom blend */}
              <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-3">
                {NEWS_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide
                        ? 'w-10 bg-[#D4A537]'
                        : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features / About */}
        <section id="about" className="py-16 md:py-24 bg-[#FBF3E2] scroll-mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#B5471A]/10 px-4 py-1 text-sm text-[#B5471A] mb-3">
                <Award className="h-3.5 w-3.5" />
                <span>{t('features.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1E3A5F]" style={{ fontWeight: 600 }}>
                {t('features.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <Card key={i} className="border border-[#D4A537]/20 hover:shadow-md transition-shadow bg-[#FFFBF0]/40">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-lg bg-[#5B2A86]/10 flex items-center justify-center mb-4">
                      <f.icon className="h-5 w-5 text-[#5B2A86]" />
                    </div>
                    <h3 className="font-bold mb-2 text-[#1E3A5F]">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 harari-pattern-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <HarariStar size={56} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto" style={{ fontWeight: 600 }}>
              {t('cta.title')}
            </h2>
            <p className="text-[#FBF3E2]/80 max-w-xl mx-auto mb-8">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={onApply} className="bg-[#D4A537] hover:bg-[#B5471A] text-[#1E3A5F] font-semibold">
                {t('cta.apply')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLogin} className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white">
                {t('common.signIn')}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function SiteHeader({ onLogin }: { onLogin: () => void }) {
  const { t } = useLanguage()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#D4A537]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <HarariEmblem size={40} />
            <div>
              <p className="font-bold text-[#1E3A5F] leading-tight" style={{ fontWeight: 600 }}>
                {t('brand.name')}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">{t('brand.subtitle')}</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollTo('how-it-works')}
              className="px-4 py-2 text-sm font-medium text-[#1E3A5F] rounded-lg hover:bg-[#5B2A86]/10 hover:text-[#5B2A86] transition-colors"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollTo('news')}
              className="px-4 py-2 text-sm font-medium text-[#1E3A5F] rounded-lg hover:bg-[#2E7A5A]/10 hover:text-[#2E7A5A] transition-colors"
            >
              News
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-4 py-2 text-sm font-medium text-[#1E3A5F] rounded-lg hover:bg-[#B5471A]/10 hover:text-[#B5471A] transition-colors"
            >
              About
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button onClick={onLogin} className="bg-[#5B2A86] hover:bg-[#4A1F6E]">
              {t('common.signIn')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="bg-[#1E3A5F] text-[#FBF3E2]/80 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <HarariEmblem size={32} />
              <p className="font-bold text-white text-lg" style={{ fontWeight: 600 }}>{t('brand.name')}</p>
            </div>
            <p className="text-sm">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">{t('footer.contact')}</p>
            <ul className="text-sm space-y-1.5">
              <li>Harar, Harari People Regional State</li>
              <li>phone: +251 25 666 1234</li>
              <li>email: pcc@harariregion.gov.et</li>
              <li>office hours: Mon–Fri, 8:30 – 17:00</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">{t('footer.quickLinks')}</p>
            <ul className="text-sm space-y-1.5">
              <li>Business registration guide</li>
              <li>Required documents checklist</li>
              <li>Frequently asked questions</li>
              <li>Verify a certificate</li>
            </ul>
          </div>
        </div>
        <div className="harari-stripe h-1 my-6 rounded-full" />
        <div className="text-center text-xs text-[#FBF3E2]/60">
          <p>© {new Date().getFullYear()} Harari Region Trade, Industry & Tourism Development Bureau. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const STEPS = [
  {
    title: 'Register & Create Profile',
    desc: 'Sign up with your national ID and contact information. Set up your applicant profile once — reuse it for future renewals.',
    icon: Users,
    bg: 'bg-[#5B2A86]',
  },
  {
    title: 'Submit Documents',
    desc: 'Upload your National ID, business plan, and supporting documents. All files are encrypted and stored securely.',
    icon: FileText,
    bg: 'bg-[#D4A537]',
  },
  {
    title: 'Pass the Assessment',
    desc: 'Take the 17-question competence assessment covering business registration, tax, labour law, and consumer protection in Ethiopia.',
    icon: BookOpen,
    bg: 'bg-[#B5471A]',
  },
  {
    title: 'Get Reviewed & Certified',
    desc: 'A regional officer reviews your application. Upon approval, your PCC is issued instantly — valid for 2 years.',
    icon: Award,
    bg: 'bg-[#2E7A5A]',
  },
]

const FEATURES = [
  {
    title: 'Fully Online Process',
    desc: 'Apply from anywhere — Harar, Dire Dawa, or abroad. No need to visit a physical office during the initial stages.',
    icon: Clock,
  },
  {
    title: 'Secure Document Storage',
    desc: 'All uploaded documents are encrypted at rest. Access is restricted to you and authorized regional officers only.',
    icon: Lock,
  },
  {
    title: 'Competence Assessment',
    desc: 'A tailored 17-question assessment on Ethiopian business law, taxation, and Harari regional regulations ensures only qualified entrepreneurs are certified.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-time Status Tracking',
    desc: 'Track your application through every stage: Draft → Submitted → Under Review → Approved → Certificate Issued.',
    icon: Bell,
  },
  {
    title: 'Verifiable Certificates',
    desc: 'Every issued certificate has a unique number. Customers and partners can verify its authenticity instantly via the public verification portal.',
    icon: CheckCircle2,
  },
  {
    title: 'Regional Compliance',
    desc: 'Built specifically for the Harari Region. Aligned with regional trade bureau regulations and federal Ethiopian law.',
    icon: Building2,
  },
]
