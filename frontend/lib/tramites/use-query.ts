'use client'

import { useSearchParams } from 'next/navigation'

export function useQueryParams() {
  return useSearchParams()
}
