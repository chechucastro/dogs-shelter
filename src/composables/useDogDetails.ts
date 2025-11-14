import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { useDogStore } from '@/stores/dog.store'
import { mockTimelineEvents } from '@/mocks/timeline.mock'
import { formatDate } from '@/utils/date.utils'
import { goToHome } from '@/utils/navigation.utils'
import type { Dog, TimelineEvent } from '@/types/dog'

/**
 * Composable for Dog Details view logic
 */
export function useDogDetails() {
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const dogStore = useDogStore()

  const dog = ref<Dog | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const timeline = ref<TimelineEvent[]>([])
  const timelineLoading = ref(false)
  const timelineError = ref<string | null>(null)

  const fetchDog = async (dogId: string): Promise<void> => {
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
      
      // Automatically load timeline if admin
      if (userStore.isAdmin) {
        await loadTimeline()
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dog details'
      console.error('Error fetching dog:', err)
    } finally {
      loading.value = false
    }
  }


  const loadTimeline = async (): Promise<void> => {
    if (!dog.value) return

    try {
      timelineLoading.value = true
      timelineError.value = null
      // Show the same timeline for all dogs
      timeline.value = mockTimelineEvents
    } catch (err) {
      timelineError.value = err instanceof Error ? err.message : 'Failed to fetch timeline'
      console.error('Error fetching timeline:', err)
    } finally {
      timelineLoading.value = false
    }
  }


  // Watch for admin status changes and load timeline if admin becomes true
  watch(
    () => userStore.isAdmin,
    async (isAdmin) => {
      if (isAdmin && dog.value && timeline.value.length === 0) {
        await loadTimeline()
      }
    }
  )

  onMounted(async () => {
    const dogId = route.params.id as string
    await fetchDog(dogId)
  })

  return {
    dog,
    loading,
    error,
    userStore,
    formatDate,
    goBack: () => goToHome(router),
    timeline,
    timelineLoading,
    timelineError,
  }
}

