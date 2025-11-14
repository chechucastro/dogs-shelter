export const STRIPE_VARIANTS = {
  true: true,
  false: false,
} as const

export type StripeVariant = keyof typeof STRIPE_VARIANTS

