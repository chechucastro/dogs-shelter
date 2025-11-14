import { tv } from 'tailwind-variants'

export const radioButtonVariants = tv({
  base: 'base-radio-button flex items-center space-x-2',
  variants: {
    size: {
      large: 'mb-6',
      default: 'mb-4',
      small: 'mb-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

