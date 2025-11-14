import type { DogImage, PaginatedResponse } from '@/types/dog'
import { API_ENDPOINTS } from '@/enums/api-endpoints.enum'
import { DOG_API_CONSTANTS, type ImageSize } from '@/enums/dog-api.enum'

// Constants
const API_KEY = import.meta.env.VITE_DOG_API_KEY
const BASE_URL = import.meta.env.VITE_DOG_API_BASE_URL
const API_HEADERS = {
  'x-api-key': API_KEY
} as const

// Pagination header names (case-insensitive, but using exact API format)
const PAGINATION_HEADERS = {
  COUNT: 'Pagination-Count',
  PAGE: 'Pagination-Page',
  LIMIT: 'Pagination-Limit'
} as const

/**
 * Makes an API request with error handling and returns both data and response
 */
async function apiRequestWithResponse<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<{ data: T; response: Response }> {
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

  const data = await response.json()
  return { data, response }
}

/**
 * Extracts pagination information from response headers
 */
function extractPaginationFromHeaders(response: Response, fallbackLimit: number, fallbackPage: number): {
  total: number
  page: number
  limit: number
} {
  const countHeader = response.headers.get(PAGINATION_HEADERS.COUNT)
  const pageHeader = response.headers.get(PAGINATION_HEADERS.PAGE)
  const limitHeader = response.headers.get(PAGINATION_HEADERS.LIMIT)

  return {
    total: countHeader ? parseInt(countHeader, 10) : 0,
    page: pageHeader ? parseInt(pageHeader, 10) : fallbackPage,
    limit: limitHeader ? parseInt(limitHeader, 10) : fallbackLimit
  }
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

    const { data, response } = await apiRequestWithResponse<DogImage[]>(API_ENDPOINTS.IMAGES_SEARCH, params)
    const pagination = extractPaginationFromHeaders(response, limit, page)
    
    return {
      data,
      total: pagination.total,
      page: pagination.page,
      limit: pagination.limit
    }
  } catch (error) {
    console.error('Error fetching dogs with images:', error)
    throw error
  }
}
