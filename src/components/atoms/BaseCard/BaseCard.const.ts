export const SHADOW_VARIANTS = {
  always: 'always',
  hover: 'hover',
  never: 'never',
} as const

export type ShadowVariant = keyof typeof SHADOW_VARIANTS

export const BODY_STYLE_VARIANTS = {
  default: 'default',
  compact: 'compact',
  spacious: 'spacious',
} as const

export type BodyStyleVariant = keyof typeof BODY_STYLE_VARIANTS

export const BODY_STYLE_PADDING: Record<BodyStyleVariant, string> = {
  default: '',
  compact: '0.5rem',
  spacious: '1.5rem',
} as const

