export interface Dog {
  id: string
  name: string
  breed: string
  age?: number | string
  birthDate?: string
  imageUrl?: string
  description?: string
  weight?: number | string
  height?: number | string
  temperament?: string | string[]
  registration?: string
}

export interface DogBreed {
  id: number
  name: string
  bred_for?: string
  breed_group?: string
  life_span?: string
  temperament?: string
  weight?: {
    imperial: string
    metric: string
  }
  height?: {
    imperial: string
    metric: string
  }
}

export interface DogImage {
  id: string
  url: string
  width: number
  height: number
  breeds?: DogBreed[]
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'found' | 'shelter' | 'medical' | 'adoption' | 'other'
}

export interface DogWithTimeline extends Dog {
  timeline?: TimelineEvent[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

