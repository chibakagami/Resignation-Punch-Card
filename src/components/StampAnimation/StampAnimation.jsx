import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './StampAnimation.module.css'

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.35 } },
}

const stampVariants = {
  initial: { y: -140, rotate: -18, scale: 0.7, opacity: 0 },
  animate: {
    y: 0, rotate: 2, scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 750, damping: 18, mass: 0.8 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
}

const inkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 3],
    opacity: [0.7, 0],
    transition: { duration: 0.55, ease: 'easeOut', delay: 0.1 },
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
