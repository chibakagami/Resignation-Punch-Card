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
      <div className={styles.perfLeft} aria-hidden />
      <div className={styles.perfRight} aria-hidden />

      <div className={styles.cardInner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.cardTitle}>離職集點卡</span>
            {(companyName || jobTitle) && (
              <span className={styles.cardSub}>
                {[companyName, jobTitle].filter(Boolean).join(' · ')}
              </span>
            )}
          </div>
          <div className={styles.headerRight}>
            <span className={styles.pageNum}>第 {cardPage} 張</span>
            <span className={styles.stampCount}>{totalStamps} 枚</span>
          </div>
        </div>

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
          <span className={styles.tagline}>用印章記錄每一個離職理由</span>
          <span className={styles.progress}>
            {stamps.length} / {SLOTS_PER_CARD}
          </span>
        </div>
      </div>
    </div>
  )
})

export default PunchCard
