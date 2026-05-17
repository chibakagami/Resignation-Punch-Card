import { useShareCard } from '../../hooks/useShareCard'
import styles from './ShareButton.module.css'

export default function ShareButton({ cardRef }) {
  const { share, isCapturing } = useShareCard(cardRef)

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
