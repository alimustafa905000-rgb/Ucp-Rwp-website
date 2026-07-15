import styles from './StatCard.module.css';

/**
 * Small glassmorphism KPI card used across the dashboard overview.
 * Props:
 *  - label: string
 *  - value: number
 *  - trend: number (percentage change, can be negative)
 *  - icon: FontAwesome icon suffix, e.g. "fa-user-graduate"
 *  - accent: 'blue' | 'purple' | 'gold' | 'red'
 *  - delay: optional stagger delay in seconds for the entrance animation
 */
export default function StatCard({ label, value, trend, icon, accent = 'blue', delay = 0 }) {
  const isUp = trend >= 0;

  return (
    <div className={`${styles.card} reveal`} style={{ transitionDelay: `${delay}s` }}>
      <div className={`${styles.iconWrap} ${styles[accent]}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className={styles.body}>
        <div className={styles.value}>{value.toLocaleString()}</div>
        <div className={styles.label}>{label}</div>
      </div>
      <div className={`${styles.trend} ${isUp ? styles.trendUp : styles.trendDown}`}>
        <i className={`fas ${isUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
        {Math.abs(trend)}%
      </div>
    </div>
  );
}
