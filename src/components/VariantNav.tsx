import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import './VariantNav.css'

const VARIANTS = [
  { to: '/', label: 'Left edge' },
  { to: '/centered', label: 'Centered' },
  { to: '/horizon', label: 'Horizon' },
  { to: '/panel', label: 'Panel' },
]
const IDLE_MS = 2500

/**
 * Layout for the clock pages: a layout switcher that appears on mouse
 * movement and hides (with the cursor) when idle, so wallpapers stay clean.
 */
export default function VariantNav() {
  const [awake, setAwake] = useState(false)

  useEffect(() => {
    let timer: number
    const wake = () => {
      setAwake(true)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setAwake(false), IDLE_MS)
    }
    window.addEventListener('pointermove', wake)
    window.addEventListener('keydown', wake)
    return () => {
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('keydown', wake)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`variants${awake ? ' awake' : ''}`}>
      <Outlet />
      <nav className="variant-nav" aria-label="Clock layouts">
        {VARIANTS.map((v) => (
          <NavLink key={v.to} to={v.to} end>
            {v.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
