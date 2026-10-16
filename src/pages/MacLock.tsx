import { useEffect, useRef, type CSSProperties } from 'react'
import { Ring } from '../clock/Ring.tsx'
import { useClock } from '../clock/useClock.ts'
import { useSecondsSweep } from '../clock/useSecondsSweep.ts'
import { useViewportSize } from '../hooks/useViewportSize.ts'
import SystemGuides from '../components/SystemGuides.tsx'
import { useGuidesToggle } from '../hooks/useGuidesToggle.ts'
import './MacLock.css'

// Local-only assets in public/local (git-ignored): the macOS lock screen clock
// font extracted from ADTNumeric.ttc, and the current desktop wallpaper.
// Resolved to an absolute URL: with a relative base (the offline build), a CSS
// url() set through a custom property resolves against the stylesheet's folder.
const LOCAL = new URL(`${import.meta.env.BASE_URL}local/`, document.baseURI).href
const FONT_FAMILY = 'SF Stencil Numeric'

// Wider spacing than other layouts: the stencil digits are broader.
const MINUTE_RADIUS = 210
const SECONDS_RADIUS = 282
const SECONDS_TICK_RADIUS = 308
const OUTER_RADIUS = SECONDS_TICK_RADIUS + 22
const WIDTH_REACH = 0.33

function useStencilFont() {
  useEffect(() => {
    const face = new FontFace(FONT_FAMILY, `url(${LOCAL}SFStencilNumeric.ttf)`, {
      weight: '1 1000',
    })
    face
      .load()
      .then(() => document.fonts.add(face))
      .catch(() => {
        // Falls back to the next font in the stack when the file is absent.
      })
    return () => {
      document.fonts.delete(face)
    }
  }, [])
}

type MacLockProps = {
  /** Screen edge the dial sits on; its reading line points the other way. */
  side?: 'left' | 'right'
}

export default function MacLock({ side = 'right' }: MacLockProps) {
  useStencilFont()
  const { now, hour, minute, minuteRotation } = useClock()
  const viewport = useViewportSize()
  const scale = Math.max(viewport.height / 2, viewport.width * WIDTH_REACH) / OUTER_RADIUS
  const secondsRef = useRef<HTMLDivElement>(null)
  useSecondsSweep(secondsRef)
  const guides = useGuidesToggle()

  const style = { '--wallpaper': `url(${LOCAL}wallpaper.jpg)` } as CSSProperties

  return (
    <main className={`mac-lock ${side}`} style={style} aria-label={now.toLocaleTimeString()}>
      <div className="dial" style={{ scale }}>
        <div className="rings">
          <Ring
            active={minute}
            rotation={minuteRotation}
            readingAngle={side === 'right' ? 180 : 0}
            clockwise={side === 'right'}
            labelRadius={MINUTE_RADIUS}
            tickRadius={MINUTE_RADIUS + 24}
          />
          <Ring
            ref={secondsRef}
            readingAngle={side === 'right' ? 180 : 0}
            clockwise={side === 'right'}
            labelRadius={SECONDS_RADIUS}
            tickRadius={SECONDS_TICK_RADIUS}
          />
        </div>
        <div className="hour">{hour}</div>
      </div>

      {guides && <SystemGuides />}
    </main>
  )
}
