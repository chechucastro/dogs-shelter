import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDogStore } from '../dog.store'
import { getDogsWithImages } from '@/services/dog-api.service'
import type { DogImage } from '@/types/dog'

// Mock the API service
vi.mock('@/services/dog-api.service', () => ({
  getDogsWithImages: vi.fn()
}))

describe('Dog Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const createMockDogImage = (id: string, breedName: string, breedId: number): DogImage => ({
    id,
    url: `https://example.com/dog${id}.jpg`,
    width: 800,
    height: 600,
    breeds: [{
      id: breedId,
      name: breedName,
      temperament: 'Friendly',
      weight: { imperial: '55-75', metric: '25-34' },
      height: { imperial: '21-24', metric: '53-61' }
    }]
  })

  it('should fetch dogs and extract breeds on initialize', async () => {
    const mockDogsResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
      createMockDogImage('2', 'Labrador', 2),
      createMockDogImage('3', 'German Shepherd', 3),
    ]

    vi.mocked(getDogsWithImages)
      .mockResolvedValueOnce({
        data: mockDogsResponse,
        total: 50,
        page: 0,
        limit: 10
      })

    const dogStore = useDogStore()
    await dogStore.initialize()

    // Should only call API once
    expect(getDogsWithImages).toHaveBeenCalledTimes(1)
    const firstCall = vi.mocked(getDogsWithImages).mock.calls[0]
    expect(firstCall[0]).toBe(10) // limit
    expect(firstCall[1]).toBe(0) // page
    expect(firstCall[2]).toBeUndefined() // breedId
    
    // Breeds should be extracted from the dogs response
    expect(dogStore.breeds.length).toBe(3)
    expect(dogStore.dogs.length).toBe(3)
    expect(dogStore.total).toBe(50)
  })

  it('should refetch dogs when page changes', async () => {
    const mockResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
    ]

    vi.mocked(getDogsWithImages)
      .mockResolvedValueOnce({
        data: mockResponse,
        total: 50,
        page: 0,
        limit: 10
      })
      .mockResolvedValueOnce({
        data: mockResponse,
        total: 50,
        page: 1,
        limit: 10
      })

    const dogStore = useDogStore()
    await dogStore.initialize()

    dogStore.setPage(2)

    // Wait for async fetch to complete
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getDogsWithImages).toHaveBeenCalledTimes(2)
    // Check that it was called with page 1 (0-based API page = 1, UI page = 2)
    const lastCall = vi.mocked(getDogsWithImages).mock.calls[1]
    expect(lastCall[0]).toBe(10) // limit
    expect(lastCall[1]).toBe(1) // page (0-based, UI page 2 = API page 1)
    expect(lastCall[2]).toBeUndefined() // breedId
  })

  it('should refetch dogs when breed filter changes', async () => {
    const mockInitialResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
      createMockDogImage('2', 'Labrador', 2),
    ]

    const mockFilteredResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
    ]

    vi.mocked(getDogsWithImages)
      .mockResolvedValueOnce({
        data: mockInitialResponse,
        total: 50,
        page: 0,
        limit: 10
      })
      .mockResolvedValueOnce({
        data: mockFilteredResponse,
        total: 20,
        page: 0,
        limit: 10
      })

    const dogStore = useDogStore()
    await dogStore.initialize()

    dogStore.setSelectedBreedFilter('Golden Retriever')

    // Wait for async fetch
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getDogsWithImages).toHaveBeenCalledTimes(2)
    expect(dogStore.selectedBreedFilter).toBe('Golden Retriever')
    expect(dogStore.currentPage).toBe(1) // Should reset to page 1
  })

  it('should reset pagination when breed is selected', async () => {
    const mockInitialResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
      createMockDogImage('2', 'Labrador', 2),
    ]

    const mockFilteredResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
    ]

    vi.mocked(getDogsWithImages)
      .mockResolvedValueOnce({
        data: mockInitialResponse,
        total: 50,
        page: 0,
        limit: 10
      })
      .mockResolvedValueOnce({
        data: mockFilteredResponse,
        total: 20,
        page: 0,
        limit: 10
      })

    const dogStore = useDogStore()
    await dogStore.initialize()

    dogStore.setPage(3)
    expect(dogStore.currentPage).toBe(3)

    dogStore.setSelectedBreedFilter('Golden Retriever')

    // Wait for async fetch
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(dogStore.currentPage).toBe(1) // Should reset to page 1
  })

  it('should calculate totalPages correctly from API response', async () => {
    const mockResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
    ]

    vi.mocked(getDogsWithImages)
      .mockResolvedValueOnce({
        data: mockResponse,
        total: 25,
        page: 0,
        limit: 10
      })

    const dogStore = useDogStore()
    await dogStore.initialize()

    expect(dogStore.total).toBe(25)
    expect(dogStore.pageSize).toBe(10)
    expect(dogStore.totalPages).toBe(3) // Math.ceil(25 / 10) = 3
  })

  it('should accumulate breeds from multiple API calls', async () => {
    const firstPageResponse: DogImage[] = [
      createMockDogImage('1', 'Golden Retriever', 1),
      createMockDogImage('2', 'Labrador', 2),
    ]

    const secondPageResponse: DogImage[] = [
      createMockDogImage('3', 'German Shepherd', 3),
      createMockDogImage('4', 'Bulldog', 4),
    ]

    vi.mocked(getDogsWithImages)
      .mockResolvedValueOnce({
        data: firstPageResponse,
        total: 50,
        page: 0,
        limit: 10
      })
      .mockResolvedValueOnce({
        data: secondPageResponse,
        total: 50,
        page: 1,
        limit: 10
      })

    const dogStore = useDogStore()
    await dogStore.initialize()

    expect(dogStore.breeds.length).toBe(2) // Golden Retriever, Labrador

    dogStore.setPage(2)
    await new Promise(resolve => setTimeout(resolve, 100))

    // Breeds should accumulate from both pages
    expect(dogStore.breeds.length).toBe(4) // All 4 breeds
    expect(dogStore.breeds.some(b => b.name === 'Golden Retriever')).toBe(true)
    expect(dogStore.breeds.some(b => b.name === 'Labrador')).toBe(true)
    expect(dogStore.breeds.some(b => b.name === 'German Shepherd')).toBe(true)
    expect(dogStore.breeds.some(b => b.name === 'Bulldog')).toBe(true)
  })
})

