import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CustomEventModal.module.css'

const PRESET_EMOJIS = ['😤','🤬','💢','😭','😩','😫','🥵','🤯','💀','🫠','😱','🙄','😒','😞','😔']

const PRESET_COLORS = ['#E74C3C','#8E44AD','#2980B9','#27AE60','#F39C12','#16A085','#E91E63','#795548']

export default function CustomEventModal({ isOpen, onSave, onCancel }) {
  const [emoji, setEmoji] = useState('')
  const [label, setLabel] = useState('')
  const [color, setColor] = useState('#E74C3C')

  function handleSave(e) {
    e.preventDefault()
    if (!emoji.trim() || !label.trim()) return
    onSave(emoji.trim(), label.trim(), color)
    setEmoji('')
    setLabel('')
    setColor('#E74C3C')
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

              <div className={styles.colorSection}>
                <label className={styles.fieldLabel}>選擇顏色</label>
                <div className={styles.colorGrid}>
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`${styles.colorBtn} ${color === c ? styles.colorSelected : ''}`}
                      style={{ background: c }}
                      onClick={() => setColor(c)}
                      aria-label={c}
                    />
                  ))}
                </div>
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
                  <div className={styles.previewColor} style={{ background: color }} />
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
