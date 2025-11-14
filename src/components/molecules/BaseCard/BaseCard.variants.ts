import { tv } from 'tailwind-variants'

export const cardVariants = tv({
  base: 'dog-card overflow-hidden',
  variants: {
    mode: {
      card: 'space-y-3',
      mini: 'flex flex-col items-center space-y-2',
    },
  },
  defaultVariants: {
    mode: 'card',
  },
})

export const nameVariants = tv({
  base: 'font-semibold text-black text-center mb-2',
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-base md:text-lg',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

