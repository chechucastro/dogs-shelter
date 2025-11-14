export const SIZE_VARIANTS = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const

export type SizeVariant = keyof typeof SIZE_VARIANTS

