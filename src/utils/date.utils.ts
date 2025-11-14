/**
 * Formats a date string to a readable format
 * @param date - Date string to format
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

