import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CustomEventModal.module.css'

const PRESET_EMOJIS = ['😤','🤬','💢','😭','😩','😫','🥵','🤯','💀','🫠','😱','🙄','😒','😞','😔']

export default function CustomEventModal({ isOpen, onSave, onCancel }) {
  const [emoji, setEmoji] = useState('')
  const [label, setLabel] = useState('')

  function handleSave(e) {
    e.preventDefault()
    if (!emoji.trim() || !label.trim()) return
    onSave(emoji.trim(), label.trim())
    setEmoji('')
    setLabel('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
              <span className={styles.titleText}>新增自訂技能</span>
            </div>

            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.emojiSection}>
                <label className={styles.fieldLabel}>選擇表情</label>
                <div className={styles.emojiGrid}>
                  {PRESET_EMOJIS.map(e => (
                    <button
                      key={e}
                      type="button"
                      className={`${styles.emojiBtn} ${emoji === e ? styles.selected : ''}`}
                      onClick={() => setEmoji(e)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <input
                  className={styles.emojiInput}
                  type="text"
                  placeholder="或自行輸入 emoji"
                  value={emoji}
                  onChange={e => setEmoji(e.target.value)}
                  maxLength={4}
                />
              </div>

              <label className={styles.fieldLabel}>
                技能名稱
                <input
                  className={styles.input}
                  type="text"
                  placeholder="例：被迫寫周報"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  maxLength={16}
                  required
                />
              </label>

              {emoji && label && (
                <div className={styles.preview}>
                  <span className={styles.previewEmoji}>{emoji}</span>
                  <span className={styles.previewLabel}>{label}</span>
                </div>
              )}

              <div className={styles.btnRow}>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>B 取消</button>
                <button type="submit" className={styles.saveBtn} disabled={!emoji || !label}>A 新增</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
