import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '../BaseCard/BaseCard.vue'

describe('BaseCard', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Card content'
      }
    })

    expect(wrapper.exists()).toBe(true)
    const card = wrapper.find('el-card-stub')
    expect(card.exists()).toBe(true)
  })

  it('should render header slot when provided', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        header: 'Card Header',
        default: 'Card content'
      }
    })

    expect(wrapper.exists()).toBe(true)
    const card = wrapper.find('el-card-stub')
    expect(card.exists()).toBe(true)
  })

  it('should render body slot when provided', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Card content',
        body: 'Body content'
      }
    })

    expect(wrapper.exists()).toBe(true)
    const card = wrapper.find('el-card-stub')
    expect(card.exists()).toBe(true)
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Card content'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should apply custom class', () => {
    const wrapper = mount(BaseCard, {
      props: {
        customClass: 'custom-card-class'
      },
      slots: {
        default: 'Card content'
      }
    })

    expect(wrapper.classes()).toContain('custom-card-class')
  })

  it('should accept different shadow variants', () => {
    const shadows = ['always', 'hover', 'never'] as const
    
    shadows.forEach(shadow => {
      const wrapper = mount(BaseCard, {
        props: { shadow: shadow as 'always' | 'hover' | 'never' },
        slots: { default: 'Card' }
      })
      
      const card = wrapper.find('el-card-stub')
      expect(card.attributes('shadow')).toBe(shadow)
    })
  })

  it('should apply body style override when provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        bodyStyleOverride: { padding: '20px' }
      },
      slots: {
        default: 'Card content'
      }
    })

    const card = wrapper.find('el-card-stub')
    const bodyStyle = card.attributes('body-style')
    expect(bodyStyle).toBeDefined()
  })
})

