import styles from './AppHeader.module.css'
import { daysUntil } from '../../utils/dateUtils'

export default function AppHeader({ companyName, jobTitle, targetDate, totalStamps, onOpenSettings }) {
  const days = daysUntil(targetDate)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.appTitle}>離職集點卡</h1>
        {(companyName || jobTitle) ? (
          <span className={styles.profile}>
            {[companyName, jobTitle].filter(Boolean).join(' · ')}
          </span>
        ) : (
          <button className={styles.setupBtn} onClick={onOpenSettings} type="button">
            點此設定公司 / 職稱
          </button>
        )}
      </div>
      <div className={styles.right}>
        {days !== null && (
          <div className={styles.countdown}>
            <span className={styles.countdownNum}>{Math.max(0, days)}</span>
            <span className={styles.countdownLabel}>天後自由</span>
          </div>
        )}
        <button
          className={styles.settingsBtn}
          onClick={onOpenSettings}
          type="button"
          aria-label="設定"
        >
          ⚙️
        </button>
      </div>
    </header>
  )
}
