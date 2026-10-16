import { useRef } from 'react'
import { Ring } from '../clock/Ring.tsx'
import { useClock } from '../clock/useClock.ts'
import { useSecondsSweep } from '../clock/useSecondsSweep.ts'
import { useViewportSize } from '../hooks/useViewportSize.ts'
import SystemGuides from '../components/SystemGuides.tsx'
import { useGuidesToggle } from '../hooks/useGuidesToggle.ts'
import './LockScreen.css'

// Mirrors the left-edge dial onto the right edge so it sits in the space the
// macOS lock screen leaves free (its clock is top-center, login bottom-center).
const SECONDS_TICK_RADIUS = 286
const OUTER_RADIUS = SECONDS_TICK_RADIUS + 22
const WIDTH_REACH = 0.38

export default function LockScreen() {
  const { now, hour, minute, minuteRotation } = useClock()
  const viewport = useViewportSize()
  const scale = Math.max(viewport.height / 2, viewport.width * WIDTH_REACH) / OUTER_RADIUS
  const secondsRef = useRef<HTMLDivElement>(null)
  useSecondsSweep(secondsRef)

  const guides = useGuidesToggle()

  return (
    <main className="lock-screen" aria-label={now.toLocaleTimeString()}>
      <div className="dial" style={{ scale }}>
        <div className="rings">
          <Ring
            active={minute}
            rotation={minuteRotation}
            readingAngle={180}
            clockwise
            labelRadius={178}
            tickRadius={202}
          />
          <Ring
            ref={secondsRef}
            readingAngle={180}
            clockwise
            labelRadius={256}
            tickRadius={SECONDS_TICK_RADIUS}
          />
        </div>
        <div className="marker" />
        <div className="hour">{hour}</div>
      </div>

      {guides && <SystemGuides />}
    </main>
  )
}
