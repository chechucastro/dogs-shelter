import { describe, it, expect } from 'vitest'
import { parseTemperament, transformToDog } from '../dog.utils'
import type { DogImage } from '@/types/dog'

describe('Dog Utils', () => {
  describe('parseTemperament', () => {
    it('should parse temperament correctly from string and array', () => {
      // Test string format
      const stringTemperament = 'Friendly, Intelligent, Devoted'
      const result1 = parseTemperament(stringTemperament)
      expect(result1).toEqual(['Friendly', 'Intelligent', 'Devoted'])

      // Test array format
      const arrayTemperament = ['Friendly', 'Intelligent', 'Devoted']
      const result2 = parseTemperament(arrayTemperament)
      expect(result2).toEqual(['Friendly', 'Intelligent', 'Devoted'])

      // Test undefined
      const result3 = parseTemperament(undefined)
      expect(result3).toEqual([])

      // Test empty string (empty string is falsy, so returns empty array)
      const result4 = parseTemperament('')
      expect(result4).toEqual([])
    })
  })

  describe('transformToDog', () => {
    it('should transform dog image to dog object correctly', () => {
      const mockDogImage: DogImage = {
        id: 'test-id',
        url: 'https://example.com/dog.jpg',
        width: 800,
        height: 600,
        breeds: [{
          id: 1,
          name: 'Golden Retriever',
          temperament: 'Friendly, Intelligent',
          weight: { imperial: '55-75', metric: '25-34' },
          height: { imperial: '21-24', metric: '53-61' },
          bred_for: 'Hunting companion'
        }]
      }

      const transformedDog = transformToDog(mockDogImage)
      expect(transformedDog).toBeTruthy()
      expect(transformedDog.id).toBe('test-id')
      expect(transformedDog.name).toBe('Golden Retriever')
      expect(transformedDog.breed).toBe('Golden Retriever')
      expect(transformedDog.imageUrl).toBe('https://example.com/dog.jpg')
      expect(transformedDog.temperament).toBe('Friendly, Intelligent')
      expect(transformedDog.weight).toBe('25-34')
      expect(transformedDog.height).toBe('53-61')
      expect(transformedDog.description).toBe('Hunting companion')
    })
  })
})

