import { EVENTS } from '../../constants/events'
import EventButton from './EventButton'
import styles from './EventPanel.module.css'

export default function EventPanel({ eventCountMap, onStamp, disabled }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>今天又怎麼了？</h2>
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
