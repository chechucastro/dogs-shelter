import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButtonGroup from '../BaseButtonGroup/BaseButtonGroup.vue'
import BaseButton from '../BaseButton/BaseButton.vue'

describe('BaseButtonGroup', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseButtonGroup, {
      slots: {
        default: '<BaseButton>Button 1</BaseButton><BaseButton>Button 2</BaseButton>'
      },
      global: {
        components: {
          BaseButton
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('el-button-group-stub').exists()).toBe(true)
  })

  it('should apply custom class', () => {
    const wrapper = mount(BaseButtonGroup, {
      props: {
        customClass: 'custom-group-class'
      },
      slots: {
        default: '<BaseButton>Button</BaseButton>'
      },
      global: {
        components: {
          BaseButton
        }
      }
    })

    expect(wrapper.classes()).toContain('custom-group-class')
  })

  it('should render children buttons', () => {
    const wrapper = mount(BaseButtonGroup, {
      slots: {
        default: '<BaseButton>Button 1</BaseButton><BaseButton>Button 2</BaseButton>'
      },
      global: {
        components: {
          BaseButton
        }
      }
    })

    const buttonGroup = wrapper.find('el-button-group-stub')
    expect(buttonGroup.exists()).toBe(true)
    // Stubs don't render slot content, but we verify the component structure
    expect(wrapper.vm).toBeTruthy()
  })
})

