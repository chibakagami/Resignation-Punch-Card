import { motion } from 'framer-motion'
import styles from './Badge.module.css'

export default function Badge({ achievement, isUnlocked, isNew }) {
  return (
    <motion.div
      className={`${styles.badge} ${isUnlocked ? styles.unlocked : styles.locked}`}
      title={`${achievement.title}：${achievement.description}`}
      animate={isNew ? { scale: [0.5, 1.25, 1.0], rotate: [0, -5, 5, 0] } : {}}
      transition={isNew ? { duration: 0.5, times: [0, 0.6, 0.8, 1] } : {}}
    >
      <div className={styles.badgeIcon}>
        <span className={styles.emoji}>{achievement.emoji}</span>
      </div>
      <span className={styles.title}>{achievement.title}</span>
      {isNew && <span className={styles.newBadge}>NEW!</span>}
    </motion.div>
  )
}
