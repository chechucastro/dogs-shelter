import { tv } from 'tailwind-variants'

export const cardVariants = tv({
  base: 'base-card cursor-pointer',
  variants: {
    shadow: {
      always: '',
      hover: 'hover:shadow-lg transition-shadow duration-200',
      never: 'shadow-none',
    },
    bodyStyle: {
      default: '',
      compact: 'p-2',
      spacious: 'p-6',
    },
  },
  defaultVariants: {
    shadow: 'always',
    bodyStyle: 'default',
  },
})

