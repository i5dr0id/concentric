import { useState } from 'react'
import { useNow } from '../hooks/useNow.ts'
import { STEP } from './Ring.tsx'

/** Current time broken into the parts every clock layout displays. */
export function useClock() {
  const now = useNow()

  // Count minutes from page load, starting at the current value, so the ring
  // never spins backwards on wrap and angles stay small.
  const totalMinutes = Math.floor(now.getTime() / 60000)
  const [startMinutes] = useState(() => totalMinutes - now.getMinutes())

  return {
    now,
    hour: String(now.getHours()).padStart(2, '0'),
    minute: now.getMinutes(),
    minuteRotation: (totalMinutes - startMinutes) * STEP,
    date: now
      .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      .toUpperCase(),
    weekday: now.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase(),
  }
}
