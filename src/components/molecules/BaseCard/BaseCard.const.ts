export const MODE_VARIANTS = {
  card: 'card',
  mini: 'mini',
} as const

export type ModeVariant = keyof typeof MODE_VARIANTS

export const CARD_CONFIG = {
  [MODE_VARIANTS.card]: {
    shadow: 'hover' as const,
    bodyStyle: 'default' as const,
    nameSize: 'medium' as const,
    imageSize: 'medium' as const,
  },
  [MODE_VARIANTS.mini]: {
    shadow: 'always' as const,
    bodyStyle: 'compact' as const,
    nameSize: 'small' as const,
    imageSize: 'small' as const,
  },
} as const

export const NOT_AVAILABLE = 'N/A'

