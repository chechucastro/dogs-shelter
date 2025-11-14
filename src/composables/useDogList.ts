import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDogStore } from '@/stores/dog.store'
import type { ViewMode } from '@/components/atoms/BaseRadioButton/BaseRadioButton.const'
import type { Dog } from '@/types/dog'

/**
 * Composable for Dog List view logic
 */
export function useDogList() {
  const router = useRouter()
  const dogStore = useDogStore()

  const viewMode = ref<ViewMode>('table')
  const selectedBreed = ref<string | undefined>(dogStore.selectedBreed)

  const handleBreedChange = (breed: string | undefined): void => {
    selectedBreed.value = breed
    dogStore.setSelectedBreed(breed)
  }

  const handleViewChange = (mode: ViewMode): void => {
    viewMode.value = mode
  }

  const handlePageChange = (page: number): void => {
    dogStore.setPage(page)
  }

  const handleViewDog = (dog: Dog): void => {
    router.push(`/dogs/${dog.id}`)
  }

  return {
    dogStore,
    viewMode,
    selectedBreed,
    handleBreedChange,
    handleViewChange,
    handlePageChange,
    handleViewDog,
  }
}

