export type ChartKind = 'bar' | 'line' | 'doughnut'

export type ChartSeries = { label: string; data: number[]; color?: string }

/** Paletas derivadas de tokens gob (claro) y sus aclarados para fondo noche. */
export const STORY_PALETTE = {
  night: ['#7EB6FF', '#FFBE5C', '#5EEAD4', '#FF8A7A', '#C4B5FD'],
  paper: ['#0F69C4', '#FF9500', '#0A9FCC', '#FF4731', '#4C2C92'],
} as const
