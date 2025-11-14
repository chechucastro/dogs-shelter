import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../user.store'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should login as admin and regular user correctly', () => {
    const userStore = useUserStore()
    
    // Test admin login
    userStore.loginAsAdmin()
    expect(userStore.currentUser?.role).toBe('admin')
    expect(userStore.isAdmin).toBe(true)
    
    // Test regular user login
    userStore.loginAsUser()
    expect(userStore.currentUser?.role).toBe('user')
    expect(userStore.isAdmin).toBe(false)
  })
})

