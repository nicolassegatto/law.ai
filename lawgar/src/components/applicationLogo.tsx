import { Scale } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface ApplicationLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
}

const ApplicationLogo = React.forwardRef<HTMLDivElement, ApplicationLogoProps>(
  ({ className, size = 16, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      <Scale size={size} /> Law.IA
    </div>
  ),
)

ApplicationLogo.displayName = 'ApplicationLogo'

export { ApplicationLogo }
