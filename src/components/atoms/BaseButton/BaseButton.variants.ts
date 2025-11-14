import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: '',
  variants: {
    type: {
      default: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      info: 'bg-gray-500 text-white hover:bg-gray-600',
      text: 'text-gray-900 hover:text-gray-600',
    },
    size: {
      large: 'text-lg px-4 py-2',
      default: 'text-base px-3 py-1.5',
      small: 'text-sm px-2 py-1',
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'default',
  },
})

