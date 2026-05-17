import { EVENTS } from '../../constants/events'
import EventButton from './EventButton'
import styles from './EventPanel.module.css'

export default function EventPanel({ eventCountMap, onStamp, disabled }) {
  return (
    <section className={styles.panel}>
      <div className={styles.titleBar}>
        <h2 className={styles.title}>▶ 選擇苦水技能！</h2>
      </div>
      <div className={styles.grid}>
        {EVENTS.map(event => (
          <EventButton
            key={event.id}
            event={event}
            count={eventCountMap[event.id] || 0}
            onClick={onStamp}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  )
}
