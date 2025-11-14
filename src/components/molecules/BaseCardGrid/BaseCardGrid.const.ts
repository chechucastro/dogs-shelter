
export const MODE_VARIANTS = {
  card: 'card',
  mini: 'mini',
} as const

export type ModeVariant = typeof MODE_VARIANTS[keyof typeof MODE_VARIANTS]

