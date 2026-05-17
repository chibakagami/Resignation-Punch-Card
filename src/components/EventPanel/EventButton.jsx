import styles from './EventButton.module.css'

export default function EventButton({ event, count, onClick, disabled, isCustom, onRemove }) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        onClick={() => onClick(event)}
        disabled={disabled}
        type="button"
      >
        <span className={styles.emoji}>{event.emoji}</span>
        <span className={styles.label}>{event.label}</span>
        {count > 0 && (
          <span className={styles.count}>{count}</span>
        )}
      </button>
      {isCustom && (
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(event.id)}
          disabled={disabled}
          type="button"
          aria-label="刪除"
          title="刪除此技能"
        >
          ✕
        </button>
      )}
    </div>
  )
}
