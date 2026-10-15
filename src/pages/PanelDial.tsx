import { useRef } from 'react'
import { Ring } from '../clock/Ring.tsx'
import { useClock } from '../clock/useClock.ts'
import { useSecondsSweep } from '../clock/useSecondsSweep.ts'
import { useViewportSize } from '../hooks/useViewportSize.ts'
import './PanelDial.css'

const SECONDS_TICK_RADIUS = 286
const OUTER_RADIUS = SECONDS_TICK_RADIUS + 22
const WIDTH_REACH = 0.36
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** Day cells for the month containing `date`, Monday first, padded with nulls. */
function monthGrid(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const lead = (new Date(year, month, 1).getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  return [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ]
}

function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1)
  return Math.round((+new Date(date.getFullYear(), date.getMonth(), date.getDate()) - +start) / 864e5) + 1
}

export default function PanelDial() {
  const { now, hour, minute, minuteRotation } = useClock()
  const viewport = useViewportSize()
  const scale = Math.max(viewport.height / 2, viewport.width * WIDTH_REACH) / OUTER_RADIUS
  const secondsRef = useRef<HTMLDivElement>(null)
  useSecondsSweep(secondsRef)

  const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' })
  const fullDate = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const monthName = now.toLocaleDateString('en-GB', { month: 'long' })
  const year = now.getFullYear()
  const daysInYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365
  const today = dayOfYear(now)
  const dayProgress = (now.getHours() * 60 + now.getMinutes()) / 1440

  return (
    <main className="panel-dial" aria-label={now.toLocaleTimeString()}>
      <div className="dial" style={{ scale }}>
        <div className="rings">
          <Ring active={minute} rotation={minuteRotation} labelRadius={178} tickRadius={202} />
          <Ring ref={secondsRef} labelRadius={256} tickRadius={SECONDS_TICK_RADIUS} />
        </div>
        <div className="hour">{hour}</div>
      </div>

      <aside className="panel">
        <div className="weekday">{weekday}</div>
        <div className="full-date">{fullDate}</div>

        <section className="calendar" aria-label={`${monthName} ${year}`}>
          <div className="calendar-title">{monthName.toUpperCase()}</div>
          <div className="calendar-grid">
            {WEEKDAYS.map((d, i) => (
              <span key={`h${i}`} className="calendar-head">
                {d}
              </span>
            ))}
            {monthGrid(now).map((d, i) => (
              <span key={i} className={d === now.getDate() ? 'today' : undefined}>
                {d ?? ''}
              </span>
            ))}
          </div>
        </section>

        <section className="progress">
          <div className="progress-row">
            <span>DAY</span>
            <div className="bar">
              <div style={{ width: `${dayProgress * 100}%` }} />
            </div>
            <span>{Math.round(dayProgress * 100)}%</span>
          </div>
          <div className="progress-row">
            <span>YEAR</span>
            <div className="bar">
              <div style={{ width: `${(today / daysInYear) * 100}%` }} />
            </div>
            <span>
              {today}/{daysInYear}
            </span>
          </div>
        </section>
      </aside>
    </main>
  )
}
