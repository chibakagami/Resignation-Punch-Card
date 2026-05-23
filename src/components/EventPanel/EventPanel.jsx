import { EVENTS } from '../../constants/events'
import EventButton from './EventButton'
import styles from './EventPanel.module.css'

export default function EventPanel({ eventCountMap, customEvents, onStamp, onAddCustom, onRemoveCustom, disabled }) {
  const allEvents = [...EVENTS, ...customEvents]

  return (
    <section className={styles.panel}>
      <div className={styles.titleBar}>
        <h2 className={styles.title}>▶ 今天又被整了什麼？</h2>
      </div>
      <div className={styles.grid}>
        {allEvents.map(event => (
          <EventButton
            key={event.id}
            event={event}
            count={eventCountMap[event.id] || 0}
            onClick={onStamp}
            disabled={disabled}
            isCustom={customEvents.some(e => e.id === event.id)}
            onRemove={onRemoveCustom}
          />
        ))}
        <button
          className={styles.addBtn}
          onClick={onAddCustom}
          disabled={disabled}
          type="button"
        >
          <span className={styles.addIcon}>＋</span>
          <span className={styles.addLabel}>新增技能</span>
        </button>
      </div>
    </section>
  )
}
