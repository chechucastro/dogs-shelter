export const TYPE_VARIANTS = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  link: 'link',
} as const

export const SIZE_VARIANTS = {
  large: 'large',
  default: 'default',
  small: 'small',
} as const

export type TypeVariant = typeof TYPE_VARIANTS[keyof typeof TYPE_VARIANTS]
export type SizeVariant = typeof SIZE_VARIANTS[keyof typeof SIZE_VARIANTS]

