import { useState } from 'react';
import styles from './Charts.module.css';

/**
 * Simple, dependency-free animated bar chart.
 * data: [{ label: string, value: number }]
 */
export default function BarChart({ data, title }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className={`${styles.chartCard} reveal`}>
      <div className={styles.chartHeader}>
        <h3>{title}</h3>
        <span className={styles.chartBadge}>This year</span>
      </div>
      <div className={styles.barChart}>
        {data.map((d, i) => {
          const heightPct = Math.max((d.value / max) * 100, 4);
          return (
            <div
              key={d.label}
              className={styles.barCol}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              {hoverIdx === i && <div className={styles.barTooltip}>{d.value}</div>}
              <div
                className={styles.bar}
                style={{ height: `${heightPct}%`, transitionDelay: `${i * 0.06}s` }}
              />
              <span className={styles.barLabel}>{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
