import { useLayoutEffect, type RefObject } from 'react'
import { STEP } from './Ring.tsx'

/**
 * Sweeps a ring continuously, one revolution per minute, by writing its
 * `--turn` every frame. Uses wall-clock time so it stays correct after sleep.
 */
export function useSecondsSweep(ref: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Angles are measured from page load to keep them small and precise.
    const base = Date.now()
    const offset = (base % 60000) / 1000
    let frame = 0
    const draw = () => {
      el.style.setProperty('--turn', `${(offset + (Date.now() - base) / 1000) * STEP}deg`)
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [ref])
}
