import type { CSSProperties, Ref } from 'react'
import './Ring.css'

export const STEP = 6 // degrees per unit on a 60-unit ring
const VALUES = Array.from({ length: 60 }, (_, i) => i)

type RingProps = {
  labelRadius: number
  tickRadius: number
  className?: string
  /** Rotation in degrees. Omit to drive `--turn` on the element directly. */
  rotation?: number
  /** Value shown on the reading line; with 5-step labels, neighbors hide. */
  active?: number
  /** Label every value, or only multiples of 5. */
  labelEvery?: 1 | 5
  /** Where the reading line sits, in degrees clockwise from 3 o'clock. */
  readingAngle?: number
  /** Increase values clockwise instead of counter-clockwise. */
  clockwise?: boolean
  majorTick?: number
  minorTick?: number
  ref?: Ref<HTMLDivElement>
}

export function Ring({
  labelRadius,
  tickRadius,
  className = '',
  rotation,
  active,
  labelEvery = 5,
  readingAngle = 0,
  clockwise = false,
  majorTick = 22,
  minorTick = 9,
  ref,
}: RingProps) {
  const dir = clockwise ? -1 : 1
  const size = (tickRadius + majorTick + 10) * 2
  const style = {
    '--base': `${readingAngle}deg`,
    '--dir': dir,
    ...(rotation === undefined ? {} : { '--turn': `${rotation}deg` }),
  } as CSSProperties
  const stepped = rotation !== undefined

  return (
    <div ref={ref} className={`ring ${stepped ? 'stepped' : 'sweep'} ${className}`} style={style}>
      <svg
        className="ticks"
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        aria-hidden
      >
        {VALUES.map((v) => {
          const major = v % 5 === 0
          return (
            <line
              key={v}
              className={major ? 'major' : undefined}
              x1={tickRadius}
              x2={tickRadius + (major ? majorTick : minorTick)}
              transform={`rotate(${-v * STEP})`}
            />
          )
        })}
      </svg>

      {VALUES.map((v) => {
        if (v % labelEvery !== 0 && active === undefined) return null
        const isActive = v === active
        let visible = v % labelEvery === 0 || isActive
        if (labelEvery === 5 && active !== undefined && !isActive) {
          const distance = Math.min(Math.abs(v - active), 60 - Math.abs(v - active))
          visible = v % 5 === 0 && distance >= 3
        }
        const angle = -dir * v * STEP
        // Counter-rotate by the ring's turn so labels stay upright.
        const style: CSSProperties = {
          transform: `rotate(${angle}deg) translateX(${labelRadius}px) rotate(calc(${-angle}deg - var(--turn) * var(--dir) - var(--base)))`,
          opacity: visible ? 1 : 0,
        }
        return (
          <span key={v} className={`label${isActive ? ' active' : ''}`} style={style}>
            <span>{String(v).padStart(2, '0')}</span>
          </span>
        )
      })}
    </div>
  )
}
