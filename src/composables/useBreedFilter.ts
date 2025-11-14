import { ref } from 'vue'

export function useBreedFilter(initialValue?: string) {
  const selectedBreed = ref<string | undefined>(initialValue)

  const updateSelectedBreed = (value: string | undefined): void => {
    selectedBreed.value = value
  }

  return {
    selectedBreed,
    updateSelectedBreed,
  }
}

