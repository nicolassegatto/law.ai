import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { IsMobileContext } from '@/_context/isMobileContext'
import { ApplicationLogo } from '@/components/applicationLogo'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeaderMobile } from '@/components/headerMobile'
import { PartnerCopy } from '@/components/partnerCopy'

const THEME_COLOR = '#055550'
// md:max-w-screen-md lg:max-w-screen-lg
const HelmetMeta = () => (
  <Helmet>
    <meta name="theme-color" content={THEME_COLOR} />
    <meta name="msapplication-navbutton-color" content={THEME_COLOR} />
    <meta name="apple-mobile-web-app-status-bar-style" content={THEME_COLOR} />
  </Helmet>
)

const MainContent = () => (
  <div className="mx-auto w-full flex-grow md:max-w-screen-md lg:max-w-screen-lg">
    <Outlet />
  </div>
)

export function AppLayout() {
  const { isMobile } = useContext(IsMobileContext)

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col">
        <HelmetMeta />
        <div className="sticky top-0 z-50 w-full bg-algar-teal-800">
          <HeaderMobile />
        </div>
        <MainContent />
        <Footer className="mt-auto flex flex-col items-center justify-center gap-2 bg-algar-teal-900 p-10 text-background">
          <PartnerCopy />
          <ApplicationLogo />
        </Footer>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HelmetMeta />
      <div className="sticky top-0 z-50 w-full bg-algar-teal-800">
        <Header />
      </div>
      <MainContent />
      <Footer className="mt-auto flex items-center justify-between gap-2 bg-algar-teal-900 p-10 text-background">
        <PartnerCopy />
        <ApplicationLogo className="font-bold" size={20} />
      </Footer>
    </div>
  )
}
