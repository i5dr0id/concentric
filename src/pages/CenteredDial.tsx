import { useRef } from 'react'
import { Ring } from '../clock/Ring.tsx'
import { useClock } from '../clock/useClock.ts'
import { useSecondsSweep } from '../clock/useSecondsSweep.ts'
import { useViewportSize } from '../hooks/useViewportSize.ts'
import './CenteredDial.css'

const SECONDS_TICK_RADIUS = 286
const OUTER_RADIUS = SECONDS_TICK_RADIUS + 22

export default function CenteredDial() {
  const { now, hour, minute, minuteRotation, date, weekday } = useClock()
  const viewport = useViewportSize()
  // Full circles centered on screen, leaving room for the date underneath.
  const scale = Math.min(viewport.height * 0.4, viewport.width * 0.3) / OUTER_RADIUS
  const secondsRef = useRef<HTMLDivElement>(null)
  useSecondsSweep(secondsRef)

  return (
    <main className="centered-dial" aria-label={now.toLocaleTimeString()}>
      <div className="dial" style={{ scale }}>
        <div className="rings">
          <Ring active={minute} rotation={minuteRotation} labelRadius={178} tickRadius={202} />
          <Ring ref={secondsRef} labelRadius={256} tickRadius={SECONDS_TICK_RADIUS} />
        </div>
        <div className="hour">{hour}</div>
      </div>

      <div className="date">
        <span className="weekday">{weekday}</span>
        <span className="dot" aria-hidden>·</span>
        <span>{date}</span>
      </div>
    </main>
  )
}
