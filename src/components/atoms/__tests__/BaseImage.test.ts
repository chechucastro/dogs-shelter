import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseImage from '../BaseImage/BaseImage.vue'

describe('BaseImage', () => {
  it('should render image when imageUrl is provided', () => {
    const wrapper = mount(BaseImage, {
      props: {
        imageUrl: 'https://example.com/image.jpg',
        alt: 'Test image'
      }
    })

    expect(wrapper.exists()).toBe(true)
    const image = wrapper.find('el-image-stub')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('https://example.com/image.jpg')
    expect(image.attributes('alt')).toBe('Test image')
  })

  it('should render placeholder when imageUrl is not provided', () => {
    const wrapper = mount(BaseImage)

    expect(wrapper.exists()).toBe(true)
    const placeholder = wrapper.find('.bg-gray-200')
    expect(placeholder.exists()).toBe(true)
  })

  it('should apply lazy loading by default', () => {
    const wrapper = mount(BaseImage, {
      props: {
        imageUrl: 'https://example.com/image.jpg'
      }
    })

    const image = wrapper.find('el-image-stub')
    expect(image.attributes('lazy')).toBe('true')
  })

  it('should accept different size variants', () => {
    const sizes = ['small', 'medium', 'large'] as const
    
    sizes.forEach(size => {
      const wrapper = mount(BaseImage, {
        props: {
          imageUrl: 'https://example.com/image.jpg',
          size: size as 'small' | 'medium' | 'large'
        }
      })
      
      expect(wrapper.exists()).toBe(true)
    })
  })

  it('should accept different fit options', () => {
    const fits = ['cover', 'contain', 'fill', 'none', 'scale-down'] as const
    
    fits.forEach(fit => {
      const wrapper = mount(BaseImage, {
        props: {
          imageUrl: 'https://example.com/image.jpg',
          fit: fit as 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
        }
      })
      
      const image = wrapper.find('el-image-stub')
      expect(image.attributes('fit')).toBe(fit)
    })
  })

  it('should disable lazy loading when lazy prop is false', () => {
    const wrapper = mount(BaseImage, {
      props: {
        imageUrl: 'https://example.com/image.jpg',
        lazy: false
      }
    })

    const image = wrapper.find('el-image-stub')
    expect(image.attributes('lazy')).toBe('false')
  })
})

