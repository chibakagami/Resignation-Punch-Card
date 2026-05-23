import styles from './CheckInPanel.module.css'

export default function CheckInPanel({ streak, hasCheckedInToday, onCheckIn, disabled }) {
  const nextMilestone = streak < 3 ? 3 : streak < 7 ? 7 : streak < 30 ? 30 : null
  const remaining = nextMilestone ? nextMilestone - streak : 0

  return (
    <section className={styles.panel}>
      <div className={styles.titleBar}>
        <h2 className={styles.titleText}>▶ 每日存活確認</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.streakRow}>
          <span className={styles.streakIcon}>🔥</span>
          <div className={styles.streakInfo}>
            <span className={styles.streakLabel}>STREAK</span>
            <span className={styles.streakNum}>{String(streak).padStart(3,'0')} DAYS</span>
          </div>
          {nextMilestone && (
            <span className={styles.streakHint}>▶ 再 {remaining} 天</span>
          )}
        </div>
        <button
          className={styles.btn}
          onClick={onCheckIn}
          disabled={hasCheckedInToday || disabled}
          type="button"
        >
          {hasCheckedInToday ? '✅ TODAY SAVED' : '💾 SAVE PROGRESS'}
        </button>
        {hasCheckedInToday && (
          <p className={styles.done}>明天再來繼續累積！</p>
        )}
        {!hasCheckedInToday && (
          <p className={styles.streakRule}>連續每天打卡才能累積，中斷一天歸零</p>
        )}
      </div>
    </section>
  )
}
