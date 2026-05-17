import { motion } from 'framer-motion'
import { EVENT_MAP } from '../../constants/events'
import styles from './StampSlot.module.css'

const slotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 25, delay: 0.55 },
  },
}

export default function StampSlot({ stamp, index, isLatest, onClick, customEvents }) {
  if (!stamp) {
    return (
      <div className={styles.slot} data-empty>
        <span className={styles.slotNumber}>{index + 1}</span>
      </div>
    )
  }

  const event = stamp.type === 'checkin'
    ? { emoji: '📅', label: '每日存檔' }
    : (EVENT_MAP[stamp.eventId]
        || customEvents?.find(e => e.id === stamp.eventId)
        || { emoji: '⭐', label: stamp.eventId })

  return (
    <motion.div
      className={styles.slot}
      data-filled
      variants={isLatest ? slotVariants : undefined}
      initial={isLatest ? 'hidden' : 'visible'}
      animate="visible"
      onClick={() => onClick?.(stamp)}
      title={stamp.note ? `${event.label}\n${stamp.date}\n${stamp.note}` : `${event.label} · ${stamp.date}`}
    >
      <span className={styles.stampEmoji}>{event.emoji}</span>
      {stamp.note && <span className={styles.noteDot} />}
    </motion.div>
  )
}
