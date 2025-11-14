import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton/BaseButton.vue'

describe('BaseButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.exists()).toBe(true)
    const button = wrapper.find('el-button-stub')
    expect(button.exists()).toBe(true)
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toBeTruthy()
  })

  it('should apply custom class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        customClass: 'custom-button-class'
      },
      slots: {
        default: 'Button'
      }
    })

    expect(wrapper.classes()).toContain('custom-button-class')
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled Button'
      }
    })

    const button = wrapper.find('el-button-stub')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('should show loading state', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true
      },
      slots: {
        default: 'Loading'
      }
    })

    const button = wrapper.find('el-button-stub')
    expect(button.attributes('loading')).toBeDefined()
  })

  it('should accept different type variants', () => {
    const types = ['default', 'primary', 'success', 'warning', 'danger', 'info']
    
    types.forEach(type => {
      const wrapper = mount(BaseButton, {
        props: { type: type as any }, // cast to any, I guess is a Vitest issue using Element Plus . :-/
        slots: { default: 'Button' }
      })

      const button = wrapper.find('el-button-stub')
      expect(button.attributes('type')).toBe(type)
    })
  })

  it('should accept different size variants', () => {
    const sizes = ['large', 'default', 'small']
    
    sizes.forEach(size => {
      const wrapper = mount(BaseButton, {
        props: { size: size as any }, // cast to any to fix TS error for test
        slots: { default: 'Button' }
      })

      const button = wrapper.find('el-button-stub')
      expect(button.attributes('size')).toBe(size)
    })
  })
})

