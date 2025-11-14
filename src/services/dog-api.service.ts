import type { DogImage, PaginatedResponse } from '@/types/dog'
import { API_ENDPOINTS } from '@/enums/api-endpoints.enum'
import { DOG_API_CONSTANTS, type ImageSize } from '@/enums/dog-api.enum'
import { estimateTotalPagination } from '@/utils/pagination.utils'

// Constants
const API_KEY = import.meta.env.VITE_DOG_API_KEY
const BASE_URL = import.meta.env.VITE_DOG_API_BASE_URL
const API_HEADERS = {
  'x-api-key': API_KEY
} as const


/**
 * Makes an API request with error handling
 */
async function apiRequest<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }
  
  const response = await fetch(url.toString(), {
    headers: API_HEADERS
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get dogs with images
 */
export async function getDogsWithImages(
  limit: number = DOG_API_CONSTANTS.DEFAULT_IMAGE_LIMIT,
  page: number = DOG_API_CONSTANTS.DEFAULT_PAGE,
  breedId?: string,
  size: ImageSize = DOG_API_CONSTANTS.DEFAULT_IMAGE_SIZE
): Promise<PaginatedResponse<DogImage>> {
  try {
    const params: Record<string, string | number | boolean> = {
      limit,
      page,
      has_breeds: DOG_API_CONSTANTS.HAS_BREEDS,
      size
    }
    
    if (breedId) {
      params.breed_ids = breedId
    }

    const data = await apiRequest<DogImage[]>(API_ENDPOINTS.IMAGES_SEARCH, params)
    
    return {
      data,
      total: estimateTotalPagination(data.length, limit, page),
      page,
      limit
    }
  } catch (error) {
    console.error('Error fetching dogs with images:', error)
    throw error
  }
}
