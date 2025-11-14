import type { TimelineEvent } from '@/types/dog'

/**
 * Composable for timeline event utilities
 */
export function useTimelineEvent() {
  /**
   * Get Element Plus timeline type from event type
   */
  const getEventType = (type: TimelineEvent['type']): string => {

    const typeMap: Record<TimelineEvent['type'], string> = {
      found: 'primary',
      shelter: 'success',
      medical: 'warning',
      adoption: 'info',
      other: 'default',
    }
    return typeMap[type] || 'default'
  }

  return {
    getEventType,
  }
}

