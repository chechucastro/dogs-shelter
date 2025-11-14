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

const createMockResponse = (data: DogImage[]) => ({
  ok: true,
  json: async () => data
})

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
        mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

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
        expect(result.total).toBeGreaterThan(0)
      })
    })

    describe('pagination parameters', () => {
      it('should fetch dogs with custom limit and page', async () => {
        mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

        const limit = 10
        const page = 2
        const result = await getDogsWithImages(limit, page)

        const url = getFetchUrl()
        expect(url.searchParams.get('limit')).toBe(String(limit))
        expect(url.searchParams.get('page')).toBe(String(page))

        expect(result.limit).toBe(limit)
        expect(result.page).toBe(page)
      })
    })

    describe('breed filtering', () => {
      it('should include breed_ids parameter when breedId is provided', async () => {
        mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

        const breedId = '123'
        await getDogsWithImages(20, 0, breedId)

        const url = getFetchUrl()
        expect(url.searchParams.get('breed_ids')).toBe(breedId)
      })

      it('should not include breed_ids parameter when breedId is not provided', async () => {
        mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

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
          mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

          await getDogsWithImages(20, 0, undefined, size)

          const url = getFetchUrl()
          expect(url.searchParams.get('size')).toBe(size)
        }
      )
    })

    describe('request headers', () => {
      it('should include API key in request headers', async () => {
        mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

        await getDogsWithImages()

        const headers = getFetchHeaders()
        expect(headers).toHaveProperty('x-api-key')
        expect(typeof headers['x-api-key']).toBe('string')
        expect(headers['x-api-key']).toBeTruthy()
      })
    })

    describe('pagination calculation', () => {
      it('should calculate total pages correctly when data length is less than limit', async () => {
        const singleDog = [mockDogImages[0]]
        mockFetch.mockResolvedValueOnce(createMockResponse(singleDog))

        const limit = 20
        const page = 0
        const result = await getDogsWithImages(limit, page)

        // When data.length < limit, total = (page * limit) + dataLength
        expect(result.total).toBe((page * limit) + singleDog.length)
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
        mockFetch.mockResolvedValueOnce(createMockResponse([]))

        const result = await getDogsWithImages()

        expect(result.data).toEqual([])
        expect(result.total).toBe(0)
      })

      it('should return correct paginated response structure', async () => {
        mockFetch.mockResolvedValueOnce(createMockResponse(mockDogImages))

        const result = await getDogsWithImages(20, 1)

        expect(result).toHaveProperty('data')
        expect(result).toHaveProperty('total')
        expect(result).toHaveProperty('page')
        expect(result).toHaveProperty('limit')
        expect(Array.isArray(result.data)).toBe(true)
        expect(typeof result.total).toBe('number')
      })
    })
  })
})

