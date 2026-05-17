import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SettingsModal.module.css'

export default function SettingsModal({ isOpen, onClose, initialValues, onSave, onReset }) {
  const [companyName, setCompanyName] = useState(initialValues.companyName)
  const [jobTitle, setJobTitle] = useState(initialValues.jobTitle)
  const [targetDate, setTargetDate] = useState(initialValues.targetDate || '')
  const [confirmReset, setConfirmReset] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    onSave(companyName.trim(), jobTitle.trim(), targetDate || null)
    onClose()
  }

  function handleReset() {
    if (!confirmReset) { setConfirmReset(true); return }
    onReset()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div className={styles.titleBar}>
              <h2 className={styles.title}>⚙ CONFIG</h2>
              <button className={styles.closeBtn} onClick={onClose} type="button">✕ CLOSE</button>
            </div>

            <form onSubmit={handleSave} className={styles.form}>
              <label className={styles.fieldLabel}>
                COMPANY NAME
                <input
                  className={styles.input}
                  type="text"
                  placeholder="爆肝科技股份有限公司"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  maxLength={30}
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
                <input
                  className={styles.input}
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                />
              </label>

              <button className={styles.saveBtn} type="submit">▶ SAVE &amp; EXIT</button>
            </form>

            <div className={styles.danger}>
              <button
                className={`${styles.resetBtn} ${confirmReset ? styles.resetConfirm : ''}`}
                onClick={handleReset}
                type="button"
              >
                {confirmReset ? '⚠ CONFIRM RESET?' : 'DELETE ALL DATA'}
              </button>
              {confirmReset && (
                <button
                  className={styles.cancelBtn}
                  onClick={() => setConfirmReset(false)}
                  type="button"
                >
                  CANCEL
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
