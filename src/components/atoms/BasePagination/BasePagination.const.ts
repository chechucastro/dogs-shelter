export const LAYOUT_VARIANTS = {
  simple: 'prev, pager, next',
  full: 'prev, pager, next, jumper, ->, total',
  compact: 'prev, pager, next',
} as const

export type LayoutVariant = keyof typeof LAYOUT_VARIANTS

export const ALIGNMENT_VARIANTS = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const

export type AlignmentVariant = keyof typeof ALIGNMENT_VARIANTS

