import { motion, AnimatePresence } from 'framer-motion'
import styles from './BadgeDetailModal.module.css'
import usePunchCardStore from '../../store/usePunchCardStore'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${y}年 ${m}月 ${d}日`
}

export default function BadgeDetailModal({ achievement, isUnlocked, unlockedDate, onClose }) {
  const { stamps, eventCountMap, streak, targetDate } = usePunchCardStore(
    s => ({ stamps: s.stamps, eventCountMap: s.eventCountMap, streak: s.streak, targetDate: s.targetDate })
  )

  if (!achievement) return null

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className={`${styles.modal} ${isUnlocked ? styles.unlocked : styles.locked}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          >
            <div className={styles.titleBar}>
              <span className={styles.titleText}>
                {isUnlocked ? '★ 已取得徽章' : '☆ 尚未取得'}
              </span>
            </div>

            <div className={styles.body}>
              <div className={`${styles.badgeDisplay} ${isUnlocked ? styles.badgeUnlocked : styles.badgeLocked}`}>
                <span className={styles.emoji}>{achievement.emoji}</span>
              </div>

              <h3 className={styles.achievementTitle}>{achievement.title}</h3>

              <div className={styles.conditionBox}>
                <span className={styles.conditionLabel}>取得條件</span>
                <p className={styles.conditionText}>{achievement.description}</p>
              </div>

              {isUnlocked && unlockedDate && (
                <div className={styles.dateBox}>
                  <span className={styles.dateLabel}>取得日期</span>
                  <span className={styles.dateValue}>{formatDate(unlockedDate)}</span>
                </div>
              )}

              {!isUnlocked && achievement.progress && (() => {
                const { current, max } = achievement.progress({ stamps, eventCountMap, streak, targetDate })
                const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0
                return (
                  <div className={styles.progressBox}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>PROGRESS</span>
                      <span className={styles.progressVal}>{current} / {max}</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })()}

              {!isUnlocked && (
                <div className={styles.lockedNote}>
                  加油！你比公司值錢
                </div>
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
