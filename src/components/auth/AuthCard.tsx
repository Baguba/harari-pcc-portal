'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, User as UserIcon, Phone, MapPin, Building2, Briefcase, FileText } from 'lucide-react'
import { HarariBorder, HarariStar } from '@/components/harari/Decorations'
import { HarariEmblem } from '@/components/harari/Emblem'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { useLanguage } from '@/lib/LanguageContext'

interface AuthCardProps {
  onAuthenticated: () => void
}

export function AuthCard({ onAuthenticated }: AuthCardProps) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<'login' | 'register'>('login')

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Register state
  const [regRole, setRegRole] = useState<'APPLICANT' | 'REVIEWER'>('APPLICANT')
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    nationalId: '',
    region: 'Harari',
    city: '',
    woreda: '',
    kebele: '',
    officeName: '',
    jobTitle: '',
  })
  const [regLoading, setRegLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      toast.error('Please enter your email and password.')
      return
    }
    setLoginLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Login failed')
        return
      }
      toast.success(`Welcome back!`)
      onAuthenticated()
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!regForm.fullName || !regForm.email || !regForm.password) {
      toast.error('Full name, email, and password are required.')
      return
    }
    if (regForm.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }
    if (regRole === 'REVIEWER' && (!regForm.officeName || !regForm.jobTitle)) {
      toast.error('Reviewers must provide their office name and job title.')
      return
    }
    setRegLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...regForm, role: regRole }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Registration failed')
        return
      }
      toast.success(`Account created. Welcome!`)
      onAuthenticated()
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setRegLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-2 border-[#D4A537]/30 overflow-hidden">
      <CardHeader className="text-center bg-gradient-to-br from-[#5B2A86] to-[#1E3A5F] text-white pb-8 pt-8 relative">
        <div className="absolute inset-0 opacity-20 harari-textile" />
        <div className="relative">
          <div className="flex justify-center mb-2">
            <HarariEmblem size={56} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t('brand.name')}
          </CardTitle>
          <CardDescription className="text-[#FBF3E2]/90 mt-1">
            {t('brand.subtitle')}
          </CardDescription>
          <HarariBorder className="opacity-80" />
          <div className="flex justify-center mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">{t('auth.tab.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('auth.tab.register')}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-9"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loginLoading} className="w-full bg-[#5B2A86] hover:bg-[#4A1F6E]">
                {loginLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {t('common.signIn')}
              </Button>

            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label>{t('auth.registerAs')}</Label>
                <Select value={regRole} onValueChange={(v) => setRegRole(v as 'APPLICANT' | 'REVIEWER')}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APPLICANT">{t('auth.role.applicant')}</SelectItem>
                    <SelectItem value="REVIEWER">{t('auth.role.reviewer')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-name">{t('auth.fullName')}</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="reg-name" value={regForm.fullName} onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })} className="pl-9" placeholder={t('auth.fullName.placeholder')} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="reg-email" type="email" value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} className="pl-9" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="reg-password" type="password" value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} className="pl-9" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">{t('auth.phone')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-phone" value={regForm.phoneNumber} onChange={(e) => setRegForm({ ...regForm, phoneNumber: e.target.value })} className="pl-9" placeholder={t('auth.phone.placeholder')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-national-id">{t('auth.nationalId')}</Label>
                  <Input id="reg-national-id" value={regForm.nationalId} onChange={(e) => setRegForm({ ...regForm, nationalId: e.target.value })} placeholder={t('auth.nationalId.placeholder')} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="reg-city">{t('auth.city')}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-city" value={regForm.city} onChange={(e) => setRegForm({ ...regForm, city: e.target.value })} className="pl-9" placeholder={t('auth.city.placeholder')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-woreda">{t('auth.woreda')}</Label>
                  <Input id="reg-woreda" value={regForm.woreda} onChange={(e) => setRegForm({ ...regForm, woreda: e.target.value })} placeholder={t('auth.woreda.placeholder')} />
                </div>
              </div>

              {regRole === 'REVIEWER' && (
                <div className="space-y-3 border-t pt-3 border-[#D4A537]/30">
                  <div className="space-y-2">
                    <Label htmlFor="reg-office">{t('auth.officeName')}</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="reg-office" value={regForm.officeName} onChange={(e) => setRegForm({ ...regForm, officeName: e.target.value })} className="pl-9" placeholder={t('auth.officeName.placeholder')} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-job">{t('auth.jobTitle')}</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="reg-job" value={regForm.jobTitle} onChange={(e) => setRegForm({ ...regForm, jobTitle: e.target.value })} className="pl-9" placeholder={t('auth.jobTitle.placeholder')} />
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" disabled={regLoading} className="w-full bg-[#5B2A86] hover:bg-[#4A1F6E]">
                {regLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {t('common.createAccount')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="bg-[#FBF3E2]/40 border-t border-[#D4A537]/20 px-6 py-3">
        <p className="text-xs text-center text-muted-foreground w-full">
          <FileText className="inline h-3 w-3 mr-1" />
          {t('brand.bureau')}
        </p>
      </CardFooter>
    </Card>
  )
}
