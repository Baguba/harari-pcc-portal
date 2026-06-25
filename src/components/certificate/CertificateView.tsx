'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Download, Printer, ShieldCheck, GraduationCap } from 'lucide-react'
import { HarariStar, HarariBorder, HarariCorner } from '@/components/harari/Decorations'
import { HarariEmblem } from '@/components/harari/Emblem'
import { formatDate, docTypeLabel, docTypeCategory } from '@/lib/helpers'
import { useLanguage } from '@/lib/LanguageContext'

interface CertificateViewProps {
  application: {
    id: string
    referenceNumber: string
    fullName: string
    nationalId: string
    businessName: string
    businessType: string
    businessSector: string
    businessAddress: string
    city: string
    region: string
    certificate?: {
      id: string
      certificateNumber: string
      status: string
      issuedAt: string
      validUntil: string
    } | null
  }
  qualifications?: string[]
  onBack: () => void
}

export function CertificateView({ application, qualifications: providedQualifications, onBack }: CertificateViewProps) {
  const { t } = useLanguage()
  const cert = application.certificate
  const [fetchedQualifications, setFetchedQualifications] = useState<string[]>(providedQualifications || [])

  useEffect(() => {
    if (providedQualifications && providedQualifications.length > 0) return
    let cancelled = false
    fetch(`/api/applications/${application.id}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (cancelled || !data.application?.documents) return
        const eduDocs = data.application.documents.filter(
          (d: any) => docTypeCategory(d.documentType) === 'education'
        )
        const labels = eduDocs.map((d: any) => docTypeLabel(d.documentType))
        setFetchedQualifications(Array.from(new Set(labels)))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [application.id, providedQualifications])

  if (!cert) {
    return (
      <Card className="border-[#B5471A]/40">
        <CardContent className="p-6 text-center">
          <p>No certificate found for this application.</p>
          <Button onClick={onBack} variant="outline" className="mt-3">{t('common.back')}</Button>
        </CardContent>
      </Card>
    )
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="space-y-4 fade-in-up">
      <div className="flex items-center justify-between no-print">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-[#5B2A86] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> {t('common.back')}
        </button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} size="sm">
            <Printer className="h-3.5 w-3.5 mr-1" /> {t('cert.print')}
          </Button>
        </div>
      </div>

      <div className="certificate-page">
        <div className="certificate-bg rounded-lg shadow-2xl border-4 border-[#D4A537]/60 p-6 md:p-12 relative overflow-hidden">
          <HarariCorner className="absolute top-0 left-0 text-[#D4A537]/60" size={70} />
          <HarariCorner className="absolute top-0 right-0 rotate-90 text-[#D4A537]/60" size={70} />
          <HarariCorner className="absolute bottom-0 right-0 rotate-180 text-[#D4A537]/60" size={70} />
          <HarariCorner className="absolute bottom-0 left-0 -rotate-90 text-[#D4A537]/60" size={70} />

          <div className="border-2 border-[#5B2A86]/30 p-6 md:p-10 relative">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <HarariEmblem size={72} />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5B2A86] font-semibold mb-1">
                {t('brand.region')}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {t('brand.bureau')}
              </p>
              <h1 className="text-2xl md:text-4xl font-bold text-[#1E3A5F] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {t('landing.cert.title')}
              </h1>
              <HarariBorder />
            </div>

            <div className="text-center space-y-3 my-6 md:my-8">
              <p className="text-sm text-muted-foreground">{t('landing.cert.thisCertifies')}</p>
              <p className="text-2xl md:text-3xl font-bold text-[#5B2A86]" style={{ fontFamily: 'var(--font-display)' }}>
                {application.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('auth.nationalId')}: <span className="font-mono font-semibold text-[#1E3A5F]">{application.nationalId}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                {t('cert.body')}
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#B5471A]" style={{ fontFamily: 'var(--font-display)' }}>
                &ldquo;{application.businessName}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground">
                {application.businessType} · {application.businessSector}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {t('cert.located')} {application.businessAddress}, {application.city}, {application.region} {t('cert.region')}
              </p>

              {fetchedQualifications.length > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2E7A5A]/10 border border-[#2E7A5A]/30">
                  <GraduationCap className="h-3.5 w-3.5 text-[#2E7A5A]" />
                  <span className="text-xs text-muted-foreground">Qualifications verified:</span>
                  <span className="text-xs font-semibold text-[#2E7A5A]">
                    {fetchedQualifications.join(' · ')}
                  </span>
                </div>
              )}
            </div>

            <HarariBorder />

            <div className="grid grid-cols-2 gap-6 mt-6 md:mt-8 text-sm">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('cert.certNumber')}</p>
                <p className="font-mono font-bold text-[#1E3A5F]">{cert.certificateNumber}</p>
                <p className="text-xs text-muted-foreground mt-2">{t('cert.issued')}: {formatDate(cert.issuedAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('cert.validUntil')}</p>
                <p className="font-mono font-bold text-[#1E3A5F]">{formatDate(cert.validUntil)}</p>
                <p className="text-xs text-muted-foreground mt-2">{t('cert.reference')}: {application.referenceNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 md:mt-12 text-xs">
              <div className="text-center">
                <div className="border-t border-[#5B2A86]/40 pt-1 mx-4">
                  <p className="font-semibold text-[#1E3A5F]">{t('cert.applicantSig')}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-[#5B2A86]/40 pt-1 mx-4">
                  <p className="font-semibold text-[#1E3A5F]">{t('cert.issuingOfficer')}</p>
                  <p className="text-muted-foreground">{t('brand.bureau')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground border-t border-[#D4A537]/30 pt-3">
              <ShieldCheck className="inline h-3 w-3 mr-1" />
              {t('cert.verifyAt')} <span className="font-semibold text-[#5B2A86]">hararipcc.gov.et/verify</span> {t('cert.verifyDesc')}
              <br />
              {t('cert.issuedUnder')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
