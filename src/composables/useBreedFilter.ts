import { ref } from 'vue'

export function useBreedFilter(initialValue?: string) {
  const selectedBreedFilter = ref<string | undefined>(initialValue)

  const updateSelectedBreedFilter = (value: string | undefined): void => {
    selectedBreedFilter.value = value
  }

  return {
    selectedBreedFilter,
    updateSelectedBreedFilter,
  }
}

