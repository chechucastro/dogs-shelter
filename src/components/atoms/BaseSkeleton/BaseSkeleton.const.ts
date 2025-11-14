export const SKELETON_VARIANTS = Object.freeze({
  ANIMATED: 'animated',
  STATIC: 'static',
} as const)

export type SkeletonVariant = typeof SKELETON_VARIANTS[keyof typeof SKELETON_VARIANTS]

