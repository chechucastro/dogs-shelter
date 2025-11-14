export const VIEW_MODE_VARIANTS = {
  table: 'table',
  cards: 'cards',
  miniCards: 'mini-cards',
} as const

export type ViewMode = 'table' | 'cards' | 'mini-cards'

export const SIZE_VARIANTS = {
  large: 'large',
  default: 'default',
  small: 'small',
} as const

export type SizeVariant = keyof typeof SIZE_VARIANTS

