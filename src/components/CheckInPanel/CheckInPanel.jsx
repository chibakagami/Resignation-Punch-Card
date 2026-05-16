import styles from './CheckInPanel.module.css'

export default function CheckInPanel({ streak, hasCheckedInToday, onCheckIn, disabled }) {
  const nextMilestone = streak < 3 ? 3 : streak < 7 ? 7 : streak < 30 ? 30 : null
  const remaining = nextMilestone ? nextMilestone - streak : 0

  return (
    <section className={styles.panel}>
      <div className={styles.streakRow}>
        <span className={styles.streakLabel}>🔥 連續打卡</span>
        <span className={styles.streakNum}>{streak} 天</span>
        {nextMilestone && (
          <span className={styles.streakHint}>再 {remaining} 天解鎖成就</span>
        )}
      </div>
      <button
        className={styles.btn}
        onClick={onCheckIn}
        disabled={hasCheckedInToday || disabled}
        type="button"
      >
        {hasCheckedInToday ? '✅ 今日已打卡' : '📅 每日打卡'}
      </button>
      {hasCheckedInToday && (
        <p className={styles.done}>明天再來繼續累積！</p>
      )}
    </section>
  )
}
