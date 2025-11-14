const ESTIMATED_TOTAL_BUFFER = 50

export function estimateTotalPagination(dataLength: number, limit: number, page: number): number {
  if (dataLength < limit) {
    return (page * limit) + dataLength
  }
  return (page + 1) * limit + ESTIMATED_TOTAL_BUFFER
}

