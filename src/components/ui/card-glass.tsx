import * as React from 'react'

import { cn } from '@/lib/utils'

const CardGlass = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-steel/20 bg-carbon text-white shadow-sm',
      className
    )}
    {...props}
  />
))
CardGlass.displayName = 'CardGlass'

const CardGlassHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardGlassHeader.displayName = 'CardGlassHeader'

const CardGlassTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardGlassTitle.displayName = 'CardGlassTitle'

const CardGlassDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-silver', className)}
    {...props}
  />
))
CardGlassDescription.displayName = 'CardGlassDescription'

const CardGlassContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardGlassContent.displayName = 'CardGlassContent'

const CardGlassFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardGlassFooter.displayName = 'CardGlassFooter'

export {
  CardGlass,
  CardGlassHeader,
  CardGlassFooter,
  CardGlassTitle,
  CardGlassDescription,
  CardGlassContent,
}
