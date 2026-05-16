import { motion } from 'framer-motion'
import styles from './Badge.module.css'

export default function Badge({ achievement, isUnlocked, isNew }) {
  return (
    <motion.div
      className={`${styles.badge} ${isUnlocked ? styles.unlocked : styles.locked}`}
      title={`${achievement.title}：${achievement.description}`}
      animate={isNew ? { scale: [0.5, 1.3, 1.0] } : {}}
      transition={isNew ? { duration: 0.5, times: [0, 0.6, 1] } : {}}
    >
      <span className={styles.emoji}>{achievement.emoji}</span>
      <span className={styles.title}>{achievement.title}</span>
      {isNew && <span className={styles.newBadge}>NEW</span>}
    </motion.div>
  )
}
