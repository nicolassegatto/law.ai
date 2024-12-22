import * as React from 'react'

import AlgarLogo from '@/assets/algarLogo.png'
import { cn } from '@/lib/utils'

// Componente para a estrutura da div que envolve o logo e o texto
const PartnerLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-center gap-2 text-xl font-bold text-background',
      className,
    )}
    {...props}
  >
    {children}
    Grupo Algar
  </div>
))
PartnerLogo.displayName = 'PartnerLogo'

// Componente para a imagem do logo
const PartnerImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    src={AlgarLogo}
    ref={ref}
    className={cn('', className)}
    {...props}
    alt="partner logo"
  />
))
PartnerImage.displayName = 'PartnerImage'

export { PartnerImage, PartnerLogo }
