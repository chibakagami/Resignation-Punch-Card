import { useShareCard } from '../../hooks/useShareCard'
import styles from './ShareButton.module.css'

export default function ShareButton({ cardRef, companyName, stampsLength, targetDate }) {
  const { share, isCapturing } = useShareCard(cardRef, { companyName, stampsLength, targetDate })

  return (
    <button
      className={styles.btn}
      onClick={share}
      disabled={isCapturing}
      type="button"
      data-html2canvas-ignore="true"
    >
      {isCapturing ? '⏳ GENERATING...' : '📤 SHARE CARD'}
    </button>
  )
}
