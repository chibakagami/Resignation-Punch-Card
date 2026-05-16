import { useState, useCallback } from 'react'
import { format } from 'date-fns'

export function useShareCard(cardRef) {
  const [isCapturing, setIsCapturing] = useState(false)

  const share = useCallback(async () => {
    if (!cardRef.current || isCapturing) return
    setIsCapturing(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      cardRef.current.classList.add('for-export')
      await new Promise(r => setTimeout(r, 50))

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#1A1A2E',
        logging: false,
      })

      cardRef.current.classList.remove('for-export')

      const link = document.createElement('a')
      link.download = `離職集點卡-${format(new Date(), 'yyyyMMdd')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Share failed:', err)
      cardRef.current?.classList.remove('for-export')
    } finally {
      setIsCapturing(false)
    }
  }, [cardRef, isCapturing])

  return { share, isCapturing }
}
