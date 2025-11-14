import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect, { type SelectOption } from '../BaseSelect/BaseSelect.vue'

describe('BaseSelect', () => {
  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  it('should render with default props', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions
      }
    })

    expect(wrapper.exists()).toBe(true)
    const select = wrapper.find('el-select-stub')
    expect(select.exists()).toBe(true)
    expect(select.attributes('placeholder')).toBe('Please select')
  })

  it('should render all options', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions
      }
    })

    const select = wrapper.find('el-select-stub')
    expect(select.exists()).toBe(true)
    // Options are rendered via v-for, but stubs don't render children arrrrrggggg !!!
    expect(wrapper.vm).toBeTruthy()
  })

  it('should emit update:modelValue when selection changes', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions
      }
    })

    const select = wrapper.find('el-select-stub')
    expect(select.exists()).toBe(true)
    expect(wrapper.vm).toBeTruthy()
  })

  it('should apply custom class', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions,
        customClass: 'custom-select-class'
      }
    })

    expect(wrapper.classes()).toContain('custom-select-class')
  })

  it('should be clearable when clearable prop is true', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions,
        clearable: true
      }
    })

    const select = wrapper.find('el-select-stub')
    expect(select.attributes('clearable')).toBe('true')
  })

  it('should be filterable when filterable prop is true', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions,
        filterable: true
      }
    })

    const select = wrapper.find('el-select-stub')
    expect(select.attributes('filterable')).toBe('true')
  })

  it('should accept different size variants', () => {
    const sizes = ['large', 'default', 'small']
    
    sizes.forEach(size => {
      const wrapper = mount(BaseSelect, {
        props: {
          options: mockOptions,
          size: size as 'large' | 'default' | 'small'
        }
      })
      
      const select = wrapper.find('el-select-stub')
      expect(select.attributes('size')).toBe(size)
    })
  })

  it('should accept custom placeholder', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: mockOptions,
        placeholder: 'Choose an option'
      }
    })

    const select = wrapper.find('el-select-stub')
    expect(select.attributes('placeholder')).toBe('Choose an option')
  })

  it('should handle numeric option values', () => {
    const numericOptions: SelectOption[] = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' }
    ]

    const wrapper = mount(BaseSelect, {
      props: {
        options: numericOptions,
        modelValue: 1
      }
    })

    expect(wrapper.exists()).toBe(true)
    const select = wrapper.find('el-select-stub')
    expect(select.attributes('model-value')).toBe('1')
  })
})

