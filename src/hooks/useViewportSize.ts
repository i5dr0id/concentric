import { useEffect, useState } from 'react'

function measure() {
  return { width: window.innerWidth, height: window.innerHeight }
}

/** Viewport width and height in CSS pixels, updated on resize. */
export function useViewportSize() {
  const [size, setSize] = useState(measure)

  useEffect(() => {
    const onResize = () => setSize(measure())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}
