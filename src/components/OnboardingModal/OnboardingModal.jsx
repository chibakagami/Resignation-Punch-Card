import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './OnboardingModal.module.css'

const FEATURES = [
  { icon: '📋', text: '記錄職場苦水，蓋章集點' },
  { icon: '💾', text: '每日打卡，累積存活天數' },
  { icon: '🏅', text: '解鎖道館徽章，迎向自由' },
]

export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(0)
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [targetDate, setTargetDate] = useState('')

  function handleStart() {
    setStep(1)
  }

  function handleSkip() {
    onComplete('', '', null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onComplete(companyName.trim(), jobTitle.trim(), targetDate || null)
  }

  return (
    <div className={styles.backdrop}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <div className={styles.titleBar}>
              <span className={styles.titleText}>★ NEW GAME</span>
            </div>

            <div className={styles.welcomeBody}>
              <div className={styles.logoArea}>
                <span className={styles.logoEmoji}>🎴</span>
                <h1 className={styles.appName}>離職集點卡</h1>
                <p className={styles.tagline}>用印章記錄每一個離職理由</p>
              </div>

              <div className={styles.featureList}>
                {FEATURES.map(f => (
                  <div key={f.text} className={styles.featureItem}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    <span className={styles.featureText}>{f.text}</span>
                  </div>
                ))}
              </div>

              <button className={styles.primaryBtn} onClick={handleStart} type="button">
                ▶ NEW GAME　開始！
              </button>
              <button className={styles.skipBtn} onClick={handleSkip} type="button">
                略過，直接進入
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="profile"
            className={styles.modal}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <div className={`${styles.titleBar} ${styles.titleBarBlue}`}>
              <span className={styles.titleText}>PLAYER REGISTRATION</span>
            </div>

            <div className={styles.profileBody}>
              <p className={styles.profileHint}>請輸入訓練師資料（可之後在設定更改）</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.fieldLabel}>
                  COMPANY NAME
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="爆肝科技股份有限公司"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    maxLength={30}
                    autoFocus
                  />
                </label>

                <label className={styles.fieldLabel}>
                  JOB TITLE
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="資深被嗆工程師"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    maxLength={20}
                  />
                </label>

                <label className={styles.fieldLabel}>
                  TARGET RESIGN DATE
                  <span className={styles.optional}>（選填）</span>
                  <input
                    className={styles.input}
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                  />
                </label>

                <button className={styles.primaryBtn} type="submit">
                  ▶ 確認，出發！
                </button>
              </form>

              <button className={styles.backBtn} onClick={() => setStep(0)} type="button">
                ◀ 返回
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
