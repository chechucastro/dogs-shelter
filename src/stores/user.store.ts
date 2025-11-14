import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

// Mock users for demo 
// In a real application, this would come from an authentication service.... Lool!
const MOCK_USERS = {
  admin: {
    id: '1',
    name: 'Admin User',
    email: 'admin@dogshelter.com',
    role: 'admin' as const,
  },
  user: {
    id: '2',
    name: 'Regular User',
    email: 'user@dogshelter.com',
    role: 'user' as const,
  },
} as const

export const useUserStore = defineStore('user', () => {
  
  const currentUser = ref<User | null>(null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function setUser(user: User | null): void {
    currentUser.value = user
  }

  function loginAsAdmin(): void {
    setUser(MOCK_USERS.admin)
  }

  function loginAsUser(): void {
    setUser(MOCK_USERS.user)
  }

  // Initialize with regular user by default
  loginAsUser()

  return {
    currentUser,
    isAdmin,
    setUser,
    loginAsAdmin,
    loginAsUser
  }
})

