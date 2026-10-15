import { useRef, type CSSProperties } from 'react'
import { Ring } from '../clock/Ring.tsx'
import { useClock } from '../clock/useClock.ts'
import { useSecondsSweep } from '../clock/useSecondsSweep.ts'
import { useViewportSize } from '../hooks/useViewportSize.ts'
import './Horizon.css'

// Design units on a 1600-wide screen. The rings are huge circles centered far
// below the screen, so only the top of each shows as a gentle arc.
const DESIGN_WIDTH = 1600
const MINUTE_RADIUS = 1300
const SECONDS_RADIUS = 1170
const READING_LINE = 0.6 // share of screen height where the minute arc peaks

export default function Horizon() {
  const { now, hour, minute, minuteRotation, date, weekday } = useClock()
  const viewport = useViewportSize()
  const scale = viewport.width / DESIGN_WIDTH
  const secondsRef = useRef<HTMLDivElement>(null)
  useSecondsSweep(secondsRef)

  const dialStyle: CSSProperties = {
    top: viewport.height * READING_LINE + MINUTE_RADIUS * scale,
    scale,
  }

  return (
    <main className="horizon" aria-label={now.toLocaleTimeString()}>
      <div className="date">
        <span className="weekday">{weekday}</span>
        <span className="dot" aria-hidden>·</span>
        <span>{date}</span>
      </div>

      <div className="hour" style={{ fontSize: 220 * scale }}>
        {hour}
      </div>

      <div className="rings">
        <div className="dial" style={dialStyle}>
          <Ring
            className="minutes"
            active={minute}
            rotation={minuteRotation}
            labelEvery={1}
            readingAngle={-90}
            clockwise
            labelRadius={MINUTE_RADIUS}
            tickRadius={MINUTE_RADIUS + 34}
            majorTick={26}
            minorTick={10}
          />
          <Ring
            ref={secondsRef}
            className="seconds"
            labelEvery={1}
            readingAngle={-90}
            clockwise
            labelRadius={SECONDS_RADIUS}
            tickRadius={SECONDS_RADIUS + 30}
            majorTick={22}
            minorTick={9}
          />
        </div>
        <div className="marker" />
      </div>
    </main>
  )
}
