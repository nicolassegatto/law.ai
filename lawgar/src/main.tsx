import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { IsMobileContextProvider } from './_context/isMobileContext.tsx'
import { App } from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IsMobileContextProvider>
      <HelmetProvider>
        <Helmet
          titleTemplate="%s | Lawriana"
          theme-color="%s"
          msapplication-navbutton-color="%s"
          apple-mobile-web-app-status-bar-style="%s"
        />
        <App />
      </HelmetProvider>
      <Toaster richColors />
    </IsMobileContextProvider>
  </StrictMode>,
)
