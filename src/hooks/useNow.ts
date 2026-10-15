import { useEffect, useState } from 'react'

/** Current time, re-rendering on each whole second. */
export function useNow() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer: number
    const tick = () => {
      const date = new Date()
      setNow(date)
      timer = window.setTimeout(tick, 1000 - date.getMilliseconds())
    }
    timer = window.setTimeout(tick, 1000 - new Date().getMilliseconds())
    return () => window.clearTimeout(timer)
  }, [])

  return now
}
