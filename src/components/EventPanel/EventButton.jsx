import styles from './EventButton.module.css'

export default function EventButton({ event, count, onClick, disabled }) {
  return (
    <button
      className={styles.btn}
      onClick={() => onClick(event)}
      disabled={disabled}
      style={{ '--event-color': event.color }}
      type="button"
    >
      <span className={styles.emoji}>{event.emoji}</span>
      <span className={styles.label}>{event.label}</span>
      {count > 0 && (
        <span className={styles.count}>{count}</span>
      )}
    </button>
  )
}
