import { forwardRef } from 'react'
import StampSlot from './StampSlot'
import styles from './PunchCard.module.css'
import { SLOTS_PER_CARD } from '../../store/usePunchCardStore'

const PunchCard = forwardRef(function PunchCard(
  { stamps, cardPage, companyName, jobTitle, totalStamps },
  ref
) {
  const slots = Array.from({ length: SLOTS_PER_CARD }, (_, i) => stamps[i] || null)
  const latestIndex = stamps.length > 0 ? stamps.length - 1 : -1

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.topStripe}>
        <span className={styles.cardTitle}>TRAINER CARD</span>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>NO.{String(cardPage).padStart(2,'0')}</span>
          <span className={styles.metaItem}>{stamps.length}/{SLOTS_PER_CARD}</span>
        </div>
      </div>
      <div className={styles.cardInner}>
        <div className={styles.grid}>
          {slots.map((stamp, i) => (
            <StampSlot
              key={stamp ? stamp.id : `empty-${i}`}
              stamp={stamp}
              index={i}
              isLatest={stamp !== null && i === latestIndex}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <span className={styles.tagline}>
            {companyName || jobTitle
              ? `${[companyName, jobTitle].filter(Boolean).join(' ')}`.substring(0, 18)
              : 'RESIGN PUNCH CARD'}
          </span>
          <span className={styles.progress}>
            {String(totalStamps).padStart(3, '0')} PTS
          </span>
        </div>
      </div>
    </div>
  )
})

export default PunchCard
