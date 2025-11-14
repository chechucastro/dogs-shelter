import { describe, it, expect, vi } from 'vitest'
import { goToHome, goToDogDetails, goBack } from '../navigation.utils'

describe('Navigation Utils', () => {
  it('should navigate correctly using navigation utilities', () => {
    const mockRouter = {
      push: vi.fn()
    } as any

    goToHome(mockRouter)
    expect(mockRouter.push).toHaveBeenCalledWith('/')

    goToDogDetails(mockRouter, 'dog-123')
    expect(mockRouter.push).toHaveBeenCalledWith('/dogs/dog-123')

    goBack(mockRouter, '/custom-route')
    expect(mockRouter.push).toHaveBeenCalledWith('/custom-route')

    goBack(mockRouter)
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })
})

