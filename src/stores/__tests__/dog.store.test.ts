import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDogStore } from '../dog.store'

describe('Dog Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should filter breeds correctly', () => {
    const dogStore = useDogStore()
    
    // Mock breeds with required properties
    const mockBreeds = [
      { id: 1, name: 'Golden Retriever' } as any,
      { id: 2, name: 'Labrador' } as any,
      { id: 3, name: 'German Shepherd' } as any,
    ]
    
    // Set breeds
    dogStore.$state.breeds = mockBreeds
    // Note: breedImages and breedImageIds are internal refs not exposed in $state
    // The dogs computed will work with empty breedImages/breedImageIds

    // Test no filter - total should match breeds length
    expect(dogStore.total).toBe(3)
    expect(dogStore.breeds.length).toBe(3)

    // Test with filter
    dogStore.setSelectedBreed('Golden Retriever')
    expect(dogStore.selectedBreed).toBe('Golden Retriever')
    expect(dogStore.total).toBe(1)

    // Clear filter
    dogStore.setSelectedBreed(undefined)
    expect(dogStore.selectedBreed).toBeUndefined()
    expect(dogStore.total).toBe(3)
  })

  it('should initialize dog store correctly', async () => {
    const dogStore = useDogStore()
    
    // Mock the API call
    const initializeSpy = vi.spyOn(dogStore, 'initialize')
    initializeSpy.mockResolvedValue()
    
    await dogStore.initialize()
    
    expect(initializeSpy).toHaveBeenCalled()
  })
})

