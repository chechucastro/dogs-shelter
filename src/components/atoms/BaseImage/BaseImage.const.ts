export const SIZE_VARIANTS = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const

export type SizeVariant = keyof typeof SIZE_VARIANTS

export const ICON_SIZES: Record<SizeVariant, number> = {
  small: 24,
  medium: 48,
  large: 64,
}

