import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { useDogStore } from '@/stores/dog.store'
import { mockTimelineEvents } from '@/mocks/timeline.mock'
import { goToDogDetails, goToHome } from '@/utils/navigation.utils'
import type { Dog, TimelineEvent } from '@/types/dog'

/**
 * Composable for Dog Timeline view logic
 */
export function useDogTimeline() {
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const dogStore = useDogStore()

  const dog = ref<Dog | null>(null)
  const timeline = ref<TimelineEvent[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDogAndTimeline = async (dogId: string): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      await dogStore.initialize()

      const fetchedDog = dogStore.getDogById(dogId)
      
      if (!fetchedDog) {
        error.value = `Dog with ID "${dogId}" not found in stored data`
        return
      }
      
      dog.value = fetchedDog

      // Show the same timeline for all dogs
      timeline.value = mockTimelineEvents
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dog timeline'
      console.error('Error fetching dog timeline:', err)
    } finally {
      loading.value = false
    }
  }

  const goBack = (): void => {
    if (dog.value) {
      goToDogDetails(router, dog.value.id)
    } else {
      goToHome(router)
    }
  }

  onMounted(async () => {
    const dogId = route.params.id as string
    await fetchDogAndTimeline(dogId)
  })

  return {
    dog,
    timeline,
    loading,
    error,
    userStore,
    goBack,
  }
}

