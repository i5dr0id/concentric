import { useEffect, useState } from 'react'

/** Whether the guides are shown: on with `?guides`, toggled with the O key. */
export function useGuidesToggle() {
  const [shown, setShown] = useState(() => new URLSearchParams(location.search).has('guides'))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'o') setShown((s) => !s)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return shown
}
