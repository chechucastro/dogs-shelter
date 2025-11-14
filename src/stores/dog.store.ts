import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Dog, DogBreed, DogImage } from '@/types/dog'
import { getDogsWithImages } from '@/services/dog-api.service'
import { transformToDog, transformBreedToDog } from '@/utils/dog.utils'

export const useDogStore = defineStore('dog', () => {
  const breeds = ref<DogBreed[]>([])
  const dogImages = ref<DogImage[]>([])
  const breedImages = ref<Record<number, string>>({})
  const breedImageIds = ref<Record<number, string>>({})
  const selectedBreed = ref<string | undefined>(undefined)
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(10)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const imagesFetched = ref<boolean>(false)

  const filteredBreeds = computed(() => {
    return selectedBreed.value
      ? breeds.value.filter(breed => breed.name === selectedBreed.value)
      : breeds.value
  })

  const dogs = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    
    return filteredBreeds.value.slice(start, end).map(breed => 
      transformBreedToDog(breed, breedImages.value, breedImageIds.value)
    )
  })

  const total = computed(() => filteredBreeds.value.length)
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  const resetPagination = (): void => {
    currentPage.value = 1
  }

  async function fetchAllDogsWithImages(): Promise<void> {
    if (imagesFetched.value) return

    try {
      error.value = null
      const response = await getDogsWithImages(50, 0)
      
      dogImages.value = response.data
      
      // Extract unique breeds from images
      const breedsMap: Record<number, DogBreed> = {}
      
      response.data.forEach(image => {
        const breed = image.breeds?.[0] // The root breed for the dog image
        if (breed) {
          // Store breed if not already present
          if (!breedsMap[breed.id]) {
            breedsMap[breed.id] = breed
          }
          
          // Store image for breed if not already present
          if (!breedImages.value[breed.id]) {
            breedImages.value[breed.id] = image.url
            breedImageIds.value[breed.id] = image.id
          }
        }
      })
      
      breeds.value = Object.values(breedsMap)
      imagesFetched.value = true
      resetPagination()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch images'
      console.error('Error fetching images:', err)
    }
  }

  function getDogById(dogId: string): Dog | null {
    const image = dogImages.value.find(img => img.id === dogId)
    return image ? transformToDog(image) : null
  }

  function setSelectedBreed(breedName: string | undefined): void {
    selectedBreed.value = breedName
    resetPagination()
  }

  function setPage(page: number): void {
    currentPage.value = page
  }

  function setPageSize(size: number): void {
    pageSize.value = size
    resetPagination()
  }

  async function initialize(): Promise<void> {
    if (imagesFetched.value) return
    
    loading.value = true
    try {
      await fetchAllDogsWithImages()
    } finally {
      loading.value = false
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
    imagesFetched,
    setSelectedBreed,
    setPage,
    setPageSize,
    initialize,
    getDogById
  }
})

