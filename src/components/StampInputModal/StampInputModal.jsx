import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { todayStr } from '../../utils/dateUtils'
import styles from './StampInputModal.module.css'

export default function StampInputModal({ event, onConfirm, onCancel }) {
  const [date, setDate] = useState(todayStr())
  const [note, setNote] = useState('')

  function handleConfirm(e) {
    e.preventDefault()
    onConfirm(event, date, note.trim())
  }

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onCancel()}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <div className={styles.titleBar}>
              <span className={styles.titleText}>使用了技能！</span>
            </div>

            <div className={styles.eventRow}>
              <span className={styles.eventEmoji}>{event.emoji}</span>
              <span className={styles.eventLabel}>{event.label}</span>
            </div>

            <form onSubmit={handleConfirm} className={styles.form}>
              <label className={styles.fieldLabel}>
                DATE（日期）
                <input
                  className={styles.input}
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </label>

              <label className={styles.fieldLabel}>
                今天遇到什麼鳥事？（選填）
                <textarea
                  className={styles.textarea}
                  placeholder="詳細說說……"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  maxLength={200}
                  rows={3}
                />
              </label>

              <div className={styles.btnRow}>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                  B 取消
                </button>
                <button type="submit" className={styles.confirmBtn}>
                  A 確認蓋章！
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
