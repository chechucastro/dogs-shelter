import { tv } from 'tailwind-variants'

export const selectVariants = tv({
  base: 'base-select',
  variants: {
    size: {
      large: '',
      default: '',
      small: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

