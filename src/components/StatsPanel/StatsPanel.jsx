import { getDate } from 'date-fns'
import { EVENTS } from '../../constants/events'
import { todayStr } from '../../utils/dateUtils'
import styles from './StatsPanel.module.css'

export default function StatsPanel({ stamps, eventCountMap, customEvents, streak, targetDate }) {
  const today = todayStr()
  const [y, m] = today.split('-')
  const currentMonth = `${y}-${m}`
  const daysPassed = getDate(new Date())

  const checkinThisMonth = stamps.filter(
    s => s.type === 'checkin' && s.date && s.date.startsWith(currentMonth)
  ).length
  const checkinRate = Math.round((checkinThisMonth / daysPassed) * 100)

  // Top 3 events
  const allEventsMap = {
    ...Object.fromEntries(EVENTS.map(e => [e.id, e])),
    ...Object.fromEntries(customEvents.map(e => [e.id, e])),
  }
  const top3 = Object.entries(eventCountMap)
    .filter(([id]) => id !== 'daily_checkin')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => ({ ...(allEventsMap[id] || { emoji: '❓', label: id }), count }))

  // Countdown
  let daysLeft = null
  if (targetDate) {
    const [ty, tm, td] = targetDate.split('-').map(Number)
    const [cy, cm, cd] = today.split('-').map(Number)
    const target = new Date(ty, tm - 1, td)
    const curr = new Date(cy, cm - 1, cd)
    daysLeft = Math.ceil((target - curr) / (1000 * 60 * 60 * 24))
  }

  return (
    <section className={styles.panel}>
      <div className={styles.titleBar}>
        <h2 className={styles.titleText}>📊 STATS</h2>
      </div>
      <div className={styles.body}>
        {/* Top 3 */}
        <div className={styles.block}>
          <span className={styles.blockLabel}>本月最常遭遇</span>
          {top3.length === 0
            ? <p className={styles.empty}>尚無紀錄</p>
            : top3.map((e, i) => (
              <div key={e.id} className={styles.topRow}>
                <span className={styles.rank}>#{i + 1}</span>
                <span className={styles.topEmoji}>{e.emoji}</span>
                <span className={styles.topLabel}>{e.label}</span>
                <span className={styles.topCount}>{e.count} 次</span>
              </div>
            ))
          }
        </div>

        {/* Check-in rate */}
        <div className={styles.block}>
          <span className={styles.blockLabel}>本月打卡率（{currentMonth}）</span>
          <div className={styles.rateRow}>
            <span className={styles.rateNum}>{checkinRate}%</span>
            <span className={styles.rateSub}>{checkinThisMonth} / {daysPassed} 天</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${checkinRate}%` }} />
          </div>
        </div>

        {/* Countdown */}
        {daysLeft !== null && (
          <div className={styles.block}>
            <span className={styles.blockLabel}>離目標日</span>
            <div className={styles.countdownRow}>
              {daysLeft > 0
                ? <><span className={styles.countdownNum}>{daysLeft}</span><span className={styles.countdownUnit}>天</span></>
                : <span className={styles.countdownDone}>已達成！自由人！🎉</span>
              }
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
