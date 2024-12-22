import * as React from 'react'

import { cn } from '@/lib/utils'

const PartnerCopy = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props}>
    Painel do parceiro &copy; Algar S/A - {new Date().getFullYear()}
  </div>
))
PartnerCopy.displayName = 'PartnerCopy'

export { PartnerCopy }
