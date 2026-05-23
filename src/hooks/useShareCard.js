import { useState, useCallback } from 'react'
import { format } from 'date-fns'

function getTagline(companyName, stampsLength, targetDate) {
  if (targetDate) {
    const [ty, tm, td] = targetDate.split('-').map(Number)
    const target = new Date(ty, tm - 1, td)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const daysLeft = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
    if (daysLeft > 0) return `距離自由還有 ${daysLeft} 天，撐著！`
    if (daysLeft === 0) return '今天就是自由日！恭喜！'
    return '已自由！恭喜跑路成功！'
  }
  if (stampsLength >= 50) return `苦水集 ${stampsLength} 枚，離職意志滿格！`
  if (stampsLength >= 10) return `苦水集 ${stampsLength} 枚，繼續撐著！`
  return '離職集點卡 — 用印章記錄每一個離職理由'
}

export function useShareCard(cardRef, storeState = {}) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [tagline, setTagline] = useState('')

  const share = useCallback(async () => {
    if (!cardRef.current || isCapturing) return
    setIsCapturing(true)

    const { companyName = '', stampsLength = 0, targetDate = null } = storeState
    const tl = getTagline(companyName, stampsLength, targetDate)
    setTagline(tl)

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
  }, [cardRef, isCapturing, storeState])

  return { share, isCapturing, tagline }
}
