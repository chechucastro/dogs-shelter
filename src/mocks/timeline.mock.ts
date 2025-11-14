import type { TimelineEvent } from '@/types/dog'

/**
 * Mock timeline events data
 * The /facts endpoint is a PREMIUM feature. Sorry guys!
 */
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2025-11-01',
    title: 'Dog found roaming the streets',
    description: 'Found wandering in downtown area, no identification tags',
    type: 'found'
  },
  {
    id: '2',
    date: '2025-11-02',
    title: 'Joined Animal Shelter',
    description: 'Brought to shelter for medical examination and care',
    type: 'shelter'
  },
  {
    id: '3',
    date: '2025-11-05',
    title: 'Medical checkup completed',
    description: 'All vaccinations up to date, healthy condition',
    type: 'medical'
  },
  {
    id: '4',
    date: '2025-11-10',
    title: 'Available for adoption',
    description: 'Ready to find a loving home',
    type: 'adoption'
  }
]

