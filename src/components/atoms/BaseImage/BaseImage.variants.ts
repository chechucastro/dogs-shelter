import { tv } from 'tailwind-variants'

export const imageSizeVariants = tv({
  base: 'object-cover rounded-lg',
  variants: {
    size: {
      small: 'w-24 h-24',
      medium: 'w-32 h-32 md:w-48 md:h-48',
      large: 'w-full h-64 md:h-96',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

