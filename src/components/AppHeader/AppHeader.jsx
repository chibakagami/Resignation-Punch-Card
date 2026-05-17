import styles from './AppHeader.module.css'
import { daysUntil } from '../../utils/dateUtils'

export default function AppHeader({ companyName, jobTitle, targetDate, totalStamps, onOpenSettings }) {
  const days = daysUntil(targetDate)

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <h1 className={styles.appTitle}>RESIGN CARD</h1>
        <button className={styles.settingsBtn} onClick={onOpenSettings} type="button" aria-label="設定">
          ⚙
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.trainerInfo}>
          <span className={styles.trainerLabel}>TRAINER</span>
          {(companyName || jobTitle) ? (
            <span className={styles.trainerName}>
              {[companyName, jobTitle].filter(Boolean).join(' · ')}
            </span>
          ) : (
            <button className={styles.setupBtn} onClick={onOpenSettings} type="button">
              SET NAME/TITLE ▶
            </button>
          )}
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>STAMPS</span>
            <span className={styles.statNum}>{String(totalStamps).padStart(3, '0')}</span>
          </div>
          {days !== null && (
            <div className={`${styles.statItem} ${styles.countdown}`}>
              <span className={styles.statLabel}>DAYS LEFT</span>
              <span className={styles.statNum}>{String(Math.max(0, days)).padStart(3, '0')}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
