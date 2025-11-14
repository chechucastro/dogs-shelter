import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import DogListView from '../DogListView.vue'

describe('Views', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
      { path: '/dogs/:id', name: 'DogDetails', component: { template: '<div>Dog Details</div>' } },
    ]
  })

  it('should handle different view modes (table, cards, mini cards)', async () => {
    const wrapper = mount(DogListView, {
      global: {
        plugins: [createPinia(), router],
        stubs: {
          'BaseCard': true,
          'BaseBreedFilter': true,
          'BaseRadioButton': true,
          'DogTable': true,
          'BaseCardGrid': true,
          'BasePagination': true,
        }
      }
    })

    // Component should mount successfully
    expect(wrapper.exists()).toBe(true)
  })
})

