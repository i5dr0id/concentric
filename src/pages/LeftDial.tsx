import { useRef } from 'react'
import { Ring } from '../clock/Ring.tsx'
import { useClock } from '../clock/useClock.ts'
import { useSecondsSweep } from '../clock/useSecondsSweep.ts'
import { useViewportSize } from '../hooks/useViewportSize.ts'
import './LeftDial.css'

// Ring sizes are in design units; the dial is scaled so its outer edge spans
// the full screen height and reaches most of the way to the middle.
const SECONDS_TICK_RADIUS = 286
const OUTER_RADIUS = SECONDS_TICK_RADIUS + 22
const WIDTH_REACH = 0.46

export default function LeftDial() {
  const { now, hour, minute, minuteRotation, date, weekday } = useClock()
  const viewport = useViewportSize()
  const scale = Math.max(viewport.height / 2, viewport.width * WIDTH_REACH) / OUTER_RADIUS
  const secondsRef = useRef<HTMLDivElement>(null)
  useSecondsSweep(secondsRef)

  return (
    <main className="left-dial" aria-label={now.toLocaleTimeString()}>
      <div className="dial" style={{ scale }}>
        <div className="rings">
          <Ring active={minute} rotation={minuteRotation} labelRadius={178} tickRadius={202} />
          <Ring ref={secondsRef} labelRadius={256} tickRadius={SECONDS_TICK_RADIUS} />
        </div>
        <div className="hour">{hour}</div>
      </div>

      <div className="date">
        <div>{date}</div>
        <div className="weekday">{weekday}</div>
      </div>
    </main>
  )
}
