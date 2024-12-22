import { Link, LinkProps, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-active={pathname === props.to}
      {...props}
      className={cn(
        'flex items-center gap-1 text-sm font-bold',
        props.className,
      )}
    />
  )
}
