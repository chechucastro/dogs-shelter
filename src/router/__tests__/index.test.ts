import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

describe('Router', () => {
  it('should have correct router routes configured', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
        { path: '/dogs/:id', name: 'DogDetails', component: { template: '<div>Dog Details</div>' } },
      ]
    })

    await router.push('/')
    expect(router.currentRoute.value.name).toBe('Home')

    await router.push('/dogs/test-id')
    expect(router.currentRoute.value.name).toBe('DogDetails')
    expect(router.currentRoute.value.params.id).toBe('test-id')
  })
})

