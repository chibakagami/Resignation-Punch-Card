import { motion, AnimatePresence } from 'framer-motion'
import { EVENT_MAP } from '../../constants/events'
import styles from './StampDetailModal.module.css'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${y}年 ${m}月 ${d}日`
}

export default function StampDetailModal({ stamp, customEvents, onClose }) {
  if (!stamp) return null

  let event
  if (stamp.type === 'checkin') {
    event = { emoji: '📅', label: '每日存檔' }
  } else {
    event = EVENT_MAP[stamp.eventId]
      || customEvents?.find(e => e.id === stamp.eventId)
      || { emoji: '⭐', label: stamp.eventId }
  }

  return (
    <AnimatePresence>
      {stamp && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <div className={styles.titleBar}>
              <span className={styles.titleText}>集點紀錄</span>
            </div>

            <div className={styles.body}>
              <div className={styles.eventRow}>
                <span className={styles.emoji}>{event.emoji}</span>
                <span className={styles.label}>{event.label}</span>
              </div>

              <div className={styles.dateRow}>
                <span className={styles.dateLabel}>DATE</span>
                <span className={styles.dateValue}>{formatDate(stamp.date)}</span>
              </div>

              {stamp.note ? (
                <div className={styles.noteBox}>
                  <span className={styles.noteLabel}>鳥事紀錄</span>
                  <p className={styles.noteText}>{stamp.note}</p>
                </div>
              ) : (
                <div className={styles.noNote}>（無鳥事紀錄）</div>
              )}
            </div>

            <div className={styles.footer}>
              <button className={styles.closeBtn} onClick={onClose} type="button">
                B 關閉
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
