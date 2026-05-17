import { useEffect } from 'react'
import { ACHIEVEMENTS } from '../../constants/achievements'
import Badge from './Badge'
import styles from './AchievementBadges.module.css'

export default function AchievementBadges({ unlockedIds, newlyUnlocked, onClearNew }) {
  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      const timer = setTimeout(onClearNew, 3000)
      return () => clearTimeout(timer)
    }
  }, [newlyUnlocked, onClearNew])

  const unlockedCount = unlockedIds.length
  const total = ACHIEVEMENTS.length

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>成就</h2>
        <span className={styles.count}>{unlockedCount} / {total}</span>
      </div>
      <div className={styles.scroll}>
        {ACHIEVEMENTS.map(a => (
          <Badge
            key={a.id}
            achievement={a}
            isUnlocked={unlockedIds.includes(a.id)}
            isNew={newlyUnlocked.includes(a.id)}
          />
        ))}
      </div>
    </section>
  )
}
