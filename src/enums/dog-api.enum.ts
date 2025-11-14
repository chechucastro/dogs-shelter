/**
 * Dog API Constants and Types
 * https://docs.thedogapi.com/reference#tag/Images
 */
export const DOG_API_CONSTANTS = Object.freeze({
  DEFAULT_IMAGE_LIMIT: 20,
  DEFAULT_PAGE: 0,
  HAS_BREEDS: true, // only return images with breed data. Default false
  DEFAULT_IMAGE_SIZE: 'thumb' as const, // Possible values: thumb, small, med or full
} as const)

export type ImageSize = 'thumb' | 'small' | 'med' | 'full'

