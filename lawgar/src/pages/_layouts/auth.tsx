import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { IsMobileContext } from '@/_context/isMobileContext'
import { ApplicationLogo } from '@/components/applicationLogo'
import { Footer } from '@/components/footer'
import { PartnerCopy } from '@/components/partnerCopy'

const THEME_COLOR = '#239687'

const HelmetMeta = () => (
  <Helmet>
    <meta name="theme-color" content={THEME_COLOR} />
    <meta name="msapplication-navbutton-color" content={THEME_COLOR} />
    <meta name="apple-mobile-web-app-status-bar-style" content={THEME_COLOR} />
  </Helmet>
)

const MainContent = () => (
  <div className="flex flex-col items-center justify-center">
    <Outlet />
  </div>
)

const DesktopLayout = () => (
  <div className="grid min-h-screen grid-cols-2">
    <div className="flex h-full flex-col justify-between border-r-4 border-algar-teal-700 border-foreground/5 bg-algar-teal-900">
      <ApplicationLogo
        size={32}
        className="p-10 text-lg font-bold text-background"
      />
      <Footer className="flex flex-col gap-2 p-10 text-background">
        <PartnerCopy />
        <ApplicationLogo />
      </Footer>
    </div>
    <MainContent />
  </div>
)

const MobileLayout = () => (
  <div className="flex h-screen flex-col">
    <div className="flex min-h-[300px] flex-col justify-between border-b-4 border-algar-teal-700 border-foreground/5 bg-algar-teal-900">
      <ApplicationLogo
        size={32}
        className="p-10 text-lg font-bold text-background"
      />
    </div>
    <div className="flex flex-1 flex-col justify-between">
      <MainContent />
      <Footer className="flex flex-col items-center justify-center gap-2 p-10 text-muted-foreground">
        <PartnerCopy />
        <ApplicationLogo />
      </Footer>
    </div>
  </div>
)

export const AuthLayout = () => {
  const { isMobile } = useContext(IsMobileContext)
  return (
    <>
      <HelmetMeta />
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  )
}
