import type { Dog, DogImage } from '@/types/dog'

/**
 * Transforms a DogImage from the API into a Dog object
 * 
 * @param image - The dog image data from the API
 * @returns A Dog object with transformed data
 */
export function transformToDog(image: DogImage): Dog {
  const breed = image.breeds?.[0]
  const fallbackName = 'Unknown'
  
  return {
    id: image.id,
    name: breed?.name || fallbackName,
    breed: breed?.name || fallbackName,
    imageUrl: image.url,
    description: breed?.bred_for,
    weight: breed?.weight?.metric || undefined,
    height: breed?.height?.metric || undefined,
    temperament: breed?.temperament || undefined,
    birthDate: undefined, // API doesn't provide this
    age: breed?.life_span || undefined
  }
}

/**
 * Parses temperament value into an array of traits
 * Handles both string and array formats. 
 * Sometimes the api returns a string (if only one temperament is present) and sometimes an array if more than one temperament is present.
 * 
 * @param temperament - The temperament value (string or string array)
 * @returns An array of temperament traits
 */
export function parseTemperament(temperament?: string | string[]): string[] {
  if (!temperament) return []
  if (Array.isArray(temperament)) return temperament
  return temperament.split(', ').map((trait) => trait.trim())
}

