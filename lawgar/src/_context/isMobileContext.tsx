import { createContext, ReactNode, useEffect, useState } from 'react'

interface IsMobileContextType {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

export const IsMobileContext = createContext({} as IsMobileContextType)

export function IsMobileContextProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <IsMobileContext.Provider
      value={{
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </IsMobileContext.Provider>
  )
}
