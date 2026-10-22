'use client'

import { useSyncExternalStore } from 'react'
import {
  readDashboardPrefs,
  serverDashboardPrefs,
  subscribeDashboardPrefs,
  writeDashboardPrefs,
} from '@/lib/tramites/dashboard'

export function useDashboardPrefs() {
  const prefs = useSyncExternalStore(subscribeDashboardPrefs, readDashboardPrefs, serverDashboardPrefs)
  return { ...prefs, setPrefs: writeDashboardPrefs }
}
