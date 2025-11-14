export const SIZE_VARIANTS = {
  large: 'large',
  default: 'default',
  small: 'small',
} as const

export type SizeVariant = keyof typeof SIZE_VARIANTS

