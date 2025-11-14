import type { Router } from 'vue-router'

/**
 * Navigate back to home page
 */
export function goToHome(router: Router): void {
  router.push('/')
}

/**
 * Navigate back to a specific route or home if route is not provided
 */
export function goBack(router: Router, route?: string): void {
  router.push(route || '/')
}

/**
 * Navigate to dog details page
 */
export function goToDogDetails(router: Router, dogId: string): void {
  router.push(`/dogs/${dogId}`)
}

