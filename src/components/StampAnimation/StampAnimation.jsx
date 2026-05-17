import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './StampAnimation.module.css'

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.06 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.3 } },
}

const stampVariants = {
  initial: { y: -160, rotate: -12, scale: 0.6, opacity: 0 },
  animate: {
    y: 0, rotate: 0, scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 700, damping: 16, mass: 0.9 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.12 } },
}

const inkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 3.2],
    opacity: [0.8, 0],
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.08 },
  },
}

export default function StampAnimation({ isPlaying, currentEvent, onComplete }) {
  useEffect(() => {
    if (!isPlaying) return
    const timer = setTimeout(onComplete, 700)
    return () => clearTimeout(timer)
  }, [isPlaying, onComplete])

  return createPortal(
    <AnimatePresence>
      {isPlaying && currentEvent && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className={styles.center}>
            <motion.div
              className={styles.inkRing}
              variants={inkVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className={styles.stamp}
              variants={stampVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className={styles.useText}>使用了技能！</span>
              <span className={styles.emoji}>{currentEvent.emoji}</span>
              <span className={styles.label}>{currentEvent.label}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
