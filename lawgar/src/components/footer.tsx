import * as React from 'react'

import { cn } from '@/lib/utils'

const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn('mx-auto w-full text-xs', className)}
      {...props}
    >
      {children}
    </footer>
  ),
)
Footer.displayName = 'Footer'

export { Footer }
