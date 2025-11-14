import { tv } from 'tailwind-variants'

export const gridVariants = tv({
  base: 'dog-card-grid w-full grid',
  variants: {
    mode: {
      mini: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2',
      card: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
    },
  },
  defaultVariants: {
    mode: 'card',
  },
})

