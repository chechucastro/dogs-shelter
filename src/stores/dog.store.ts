import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Dog, DogBreed, DogImage } from '@/types/dog'
import { getDogsWithImages } from '@/services/dog-api.service'
import { transformToDog } from '@/utils/dog.utils'

export const useDogStore = defineStore('dog', () => {
  const dogs = ref<Dog[]>([])
  const breeds = ref<DogBreed[]>([])
  const dogImages = ref<DogImage[]>([])
  const selectedBreed = ref<string | undefined>(undefined)
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const breedsFetched = ref<boolean>(false)
  const dogsFetched = ref<boolean>(false)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  /**
   * Extract and accumulate breeds from dog images
   */
  function extractBreedsFromImages(images: DogImage[]): void {
    const breedsMap: Record<number, DogBreed> = {}
    
    // Add existing breeds to map
    breeds.value.forEach(breed => {
      breedsMap[breed.id] = breed
    })
    
    // Extract breeds from new images
    images.forEach(image => {
      const breed = image.breeds?.[0]
      if (breed && !breedsMap[breed.id]) {
        breedsMap[breed.id] = breed
      }
    })
    
    // Update breeds array
    breeds.value = Object.values(breedsMap)
  }

  /**
   * Fetch dogs with pagination from API
   */
  async function fetchDogs(): Promise<void> {
    try {
      loading.value = true
      error.value = null
      
      // Convert page from 1-based (UI) to 0-based (API)
      const apiPage = currentPage.value - 1
      
      // Get breed ID if breed is selected
      const breedId = selectedBreed.value
        ? breeds.value.find(b => b.name === selectedBreed.value)?.id.toString()
        : undefined

      const response = await getDogsWithImages(pageSize.value, apiPage, breedId)
      
      // Store raw images for getDogById
      dogImages.value = response.data
      
      // Transform to Dog objects
      dogs.value = response.data.map(image => transformToDog(image))
      
      // Extract and accumulate breeds from the response
      extractBreedsFromImages(response.data)
      
      // Use pagination from API headers
      total.value = response.total
      // Update currentPage and pageSize from API response if they differ
      if (response.page !== undefined) {
        currentPage.value = response.page + 1 // Convert from 0-based to 1-based
      }
      if (response.limit !== undefined) {
        pageSize.value = response.limit
      }
      
      dogsFetched.value = true
      breedsFetched.value = true // Mark breeds as fetched (accumulated from dogs)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dogs'
      console.error('Error fetching dogs:', err)
      dogs.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  const resetPagination = (): void => {
    currentPage.value = 1
  }

  function getDogById(dogId: string): Dog | null {
    const image = dogImages.value.find(img => img.id === dogId)
    return image ? transformToDog(image) : null
  }

  function setSelectedBreed(breedName: string | undefined): void {
    selectedBreed.value = breedName
    resetPagination()
    fetchDogs() // Refetch with new breed filter
  }

  function setPage(page: number): void {
    currentPage.value = page
    fetchDogs() // Refetch with new page
  }

  function setPageSize(size: number): void {
    pageSize.value = size
    resetPagination()
    fetchDogs() // Refetch with new page size
  }

  async function initialize(): Promise<void> {
    // Fetch initial page of dogs (breeds will be extracted from this response)
    if (!dogsFetched.value) {
      await fetchDogs()
    }
  }

  return {
    dogs,
    breeds,
    selectedBreed,
    currentPage,
    pageSize,
    total,
    loading,
    error,
    totalPages,
    setSelectedBreed,
    setPage,
    setPageSize,
    initialize,
    getDogById,
    fetchDogs // Expose for manual refresh if needed
  }
})

