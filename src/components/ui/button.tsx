import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

// DESIGN §4 button variants. Yellow is a fill with ink text only (DESIGN §2.1).
export const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold transition-colors duration-150 ease-brand disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-yellow tracking-[0.02em] text-ink-900 uppercase hover:bg-brand-yellow-hover',
        secondary: 'bg-ink-900 text-white hover:bg-ink-700',
        outline: 'border border-ink-900 bg-transparent text-ink-900 hover:bg-steel-100',
        'outline-light': 'border border-white bg-transparent text-white hover:bg-white/10',
        ghost: 'text-ink-900 underline-offset-4 hover:underline',
        whatsapp: 'bg-whatsapp-dark text-white hover:bg-ink-900',
      },
      size: {
        md: 'h-11',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button'
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
