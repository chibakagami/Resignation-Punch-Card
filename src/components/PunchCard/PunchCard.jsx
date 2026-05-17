import { forwardRef } from 'react'
import StampSlot from './StampSlot'
import styles from './PunchCard.module.css'
import { SLOTS_PER_CARD } from '../../store/usePunchCardStore'

const PunchCard = forwardRef(function PunchCard(
  { stamps, viewingPage, totalPages, totalStamps, companyName, jobTitle, onPrevPage, onNextPage, onSlotClick, customEvents },
  ref
) {
  const slots = Array.from({ length: SLOTS_PER_CARD }, (_, i) => stamps[i] || null)
  // Only latest slot gets entrance animation (only when viewing current page)
  const isCurrentPage = viewingPage === totalPages
  const latestOnPage = stamps.length > 0 ? stamps.length - 1 : -1

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.topStripe}>
        <span className={styles.cardTitle}>TRAINER CARD</span>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            {String(totalStamps).padStart(3, '0')} PTS
          </span>
        </div>
      </div>

      <div className={styles.cardInner}>
        <div className={styles.grid}>
          {slots.map((stamp, i) => (
            <StampSlot
              key={stamp ? stamp.id : `empty-${i}`}
              stamp={stamp}
              index={(viewingPage - 1) * SLOTS_PER_CARD + i}
              isLatest={isCurrentPage && stamp !== null && i === latestOnPage}
              onClick={onSlotClick}
              customEvents={customEvents}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.pageNav}>
            <button
              className={styles.pageBtn}
              onClick={onPrevPage}
              disabled={viewingPage <= 1}
              type="button"
              aria-label="前一頁"
            >
              ◀
            </button>
            <span className={styles.pageIndicator}>
              {viewingPage} / {totalPages}
            </span>
            <button
              className={styles.pageBtn}
              onClick={onNextPage}
              disabled={viewingPage >= totalPages}
              type="button"
              aria-label="下一頁"
            >
              ▶
            </button>
          </div>

          <span className={styles.tagline}>
            {companyName || jobTitle
              ? `${[companyName, jobTitle].filter(Boolean).join(' ')}`.substring(0, 18)
              : 'RESIGN PUNCH CARD'}
          </span>
        </div>
      </div>
    </div>
  )
})

export default PunchCard
