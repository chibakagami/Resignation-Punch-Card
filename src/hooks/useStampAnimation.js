import { useState, useCallback } from 'react'

export function useStampAnimation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)

  const startAnimation = useCallback((event) => {
    setCurrentEvent(event)
    setIsPlaying(true)
  }, [])

  const stopAnimation = useCallback(() => {
    setIsPlaying(false)
    setCurrentEvent(null)
  }, [])

  return { isPlaying, currentEvent, startAnimation, stopAnimation }
}
