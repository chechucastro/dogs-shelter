import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getDogsWithImages } from '../dog-api.service'
import { DOG_API_CONSTANTS } from '@/enums/dog-api.enum'
import { API_ENDPOINTS } from '@/enums/api-endpoints.enum'
import type { DogImage } from '@/types/dog'

// Mock fetch using vi.stubGlobal (recommended approach)
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

// Test helpers
const createMockDogImage = (id: string, name: string): DogImage => ({
  id,
  url: `https://example.com/dog${id}.jpg`,
  width: 800,
  height: 600,
  breeds: [{
    id: Number(id),
    name,
    temperament: 'Friendly',
    weight: { imperial: '55-75', metric: '25-34' },
    height: { imperial: '21-24', metric: '53-61' }
  }]
})

const createMockResponse = (
  data: DogImage[],
  paginationCount?: number,
  paginationPage?: number,
  paginationLimit?: number
) => {
  const headers = new Headers()
  if (paginationCount !== undefined) {
    headers.set('Pagination-Count', String(paginationCount))
  }
  if (paginationPage !== undefined) {
    headers.set('Pagination-Page', String(paginationPage))
  }
  if (paginationLimit !== undefined) {
    headers.set('Pagination-Limit', String(paginationLimit))
  }

  return {
    ok: true,
    headers,
    json: async () => data
  }
}

const createErrorResponse = (status: number, statusText: string) => ({
  ok: false,
  status,
  statusText,
  json: async () => ({ error: 'Server error' })
})

const getFetchUrl = (): URL => {
  const fetchCall = mockFetch.mock.calls[0]
  return new URL(fetchCall[0])
}

const getFetchHeaders = () => {
  const fetchCall = mockFetch.mock.calls[0]
  return fetchCall[1].headers
}

describe('Dog API Service', () => {
  const mockDogImages: DogImage[] = [
    createMockDogImage('1', 'Golden Retriever'),
    createMockDogImage('2', 'Labrador')
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getDogsWithImages', () => {

    describe('default parameters', () => {
      it('should fetch dogs with default parameters', async () => {
        const totalCount = 100
        mockFetch.mockResolvedValueOnce(
          createMockResponse(
            mockDogImages,
            totalCount,
            DOG_API_CONSTANTS.DEFAULT_PAGE,
            DOG_API_CONSTANTS.DEFAULT_IMAGE_LIMIT
          )
        )

        const result = await getDogsWithImages()

        expect(mockFetch).toHaveBeenCalledTimes(1)
        const url = getFetchUrl()
        
        expect(url.pathname).toContain(API_ENDPOINTS.IMAGES_SEARCH)
        expect(url.searchParams.get('limit')).toBe(String(DOG_API_CONSTANTS.DEFAULT_IMAGE_LIMIT))
        expect(url.searchParams.get('page')).toBe(String(DOG_API_CONSTANTS.DEFAULT_PAGE))
        expect(url.searchParams.get('has_breeds')).toBe(String(DOG_API_CONSTANTS.HAS_BREEDS))
        expect(url.searchParams.get('size')).toBe(DOG_API_CONSTANTS.DEFAULT_IMAGE_SIZE)

        expect(result.data).toEqual(mockDogImages)
        expect(result.page).toBe(DOG_API_CONSTANTS.DEFAULT_PAGE)
        expect(result.limit).toBe(DOG_API_CONSTANTS.DEFAULT_IMAGE_LIMIT)
        expect(result.total).toBe(totalCount)
      })
    })

    describe('pagination parameters', () => {
      it('should fetch dogs with custom limit and page', async () => {
        const limit = 10
        const page = 2
        const totalCount = 50
        mockFetch.mockResolvedValueOnce(
          createMockResponse(mockDogImages, totalCount, page, limit)
        )

        const result = await getDogsWithImages(limit, page)

        const url = getFetchUrl()
        expect(url.searchParams.get('limit')).toBe(String(limit))
        expect(url.searchParams.get('page')).toBe(String(page))

        expect(result.limit).toBe(limit)
        expect(result.page).toBe(page)
        expect(result.total).toBe(totalCount)
      })
    })

    describe('breed filtering', () => {
      it('should include breed_ids parameter when breedId is provided', async () => {
        mockFetch.mockResolvedValueOnce(
          createMockResponse(mockDogImages, 10, 0, 20)
        )

        const breedId = '123'
        await getDogsWithImages(20, 0, breedId)

        const url = getFetchUrl()
        expect(url.searchParams.get('breed_ids')).toBe(breedId)
      })

      it('should not include breed_ids parameter when breedId is not provided', async () => {
        mockFetch.mockResolvedValueOnce(
          createMockResponse(mockDogImages, 100, 0, 20)
        )

        await getDogsWithImages()

        const url = getFetchUrl()
        expect(url.searchParams.has('breed_ids')).toBe(false)
      })
    })

    describe('image size variants', () => {
      it.each(['thumb', 'small', 'med', 'full'] as const)(
        'should accept %s image size parameter',
        async (size) => {
          vi.clearAllMocks()
          mockFetch.mockResolvedValueOnce(
            createMockResponse(mockDogImages, 50, 0, 20)
          )

          await getDogsWithImages(20, 0, undefined, size)

          const url = getFetchUrl()
          expect(url.searchParams.get('size')).toBe(size)
        }
      )
    })

    describe('request headers', () => {
      it('should include API key in request headers', async () => {
        mockFetch.mockResolvedValueOnce(
          createMockResponse(mockDogImages, 100, 0, 20)
        )

        await getDogsWithImages()

        const headers = getFetchHeaders()
        expect(headers).toHaveProperty('x-api-key')
        expect(typeof headers['x-api-key']).toBe('string')
        expect(headers['x-api-key']).toBeTruthy()
      })
    })

    describe('pagination headers', () => {
      it('should use pagination headers from API response', async () => {
        const totalCount = 150
        const page = 1
        const limit = 20
        mockFetch.mockResolvedValueOnce(
          createMockResponse(mockDogImages, totalCount, page, limit)
        )

        const result = await getDogsWithImages(limit, page)

        expect(result.total).toBe(totalCount)
        expect(result.page).toBe(page)
        expect(result.limit).toBe(limit)
      })

      it('should use fallback values when pagination headers are missing', async () => {
        const limit = 20
        const page = 0
        // Create response without pagination headers
        mockFetch.mockResolvedValueOnce({
          ok: true,
          headers: new Headers(),
          json: async () => mockDogImages
        })

        const result = await getDogsWithImages(limit, page)

        expect(result.total).toBe(0) // No count header, defaults to 0
        expect(result.page).toBe(page) // Falls back to provided page
        expect(result.limit).toBe(limit) // Falls back to provided limit
      })
    })

    describe('error handling', () => {
      it('should throw error when API request fails', async () => {
        const errorMessage = 'API request failed: 500 Internal Server Error'
        mockFetch.mockResolvedValueOnce(createErrorResponse(500, 'Internal Server Error'))

        await expect(getDogsWithImages()).rejects.toThrow(errorMessage)
      })

      it('should throw error when fetch fails', async () => {
        const networkError = new Error('Network error')
        mockFetch.mockRejectedValueOnce(networkError)

        await expect(getDogsWithImages()).rejects.toThrow('Network error')
      })
    })

    describe('response handling', () => {
      it('should handle empty response array', async () => {
        mockFetch.mockResolvedValueOnce(
          createMockResponse([], 0, 0, 20)
        )

        const result = await getDogsWithImages()

        expect(result.data).toEqual([])
        expect(result.total).toBe(0)
      })

      it('should return correct paginated response structure', async () => {
        const totalCount = 200
        const page = 1
        const limit = 20
        mockFetch.mockResolvedValueOnce(
          createMockResponse(mockDogImages, totalCount, page, limit)
        )

        const result = await getDogsWithImages(limit, page)

        expect(result).toHaveProperty('data')
        expect(result).toHaveProperty('total')
        expect(result).toHaveProperty('page')
        expect(result).toHaveProperty('limit')
        expect(Array.isArray(result.data)).toBe(true)
        expect(typeof result.total).toBe('number')
        expect(result.total).toBe(totalCount)
        expect(result.page).toBe(page)
        expect(result.limit).toBe(limit)
      })
    })
  })
})

