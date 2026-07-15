import styles from './Charts.module.css';

/**
 * Dependency-free animated donut chart built from plain SVG circles.
 * data: [{ label: string, value: number (percentage, should sum ~100), color: css color }]
 */
export default function DonutChart({ data, title }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  return (
    <div className={`${styles.chartCard} reveal`}>
      <div className={styles.chartHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.donutWrap}>
        <svg viewBox="0 0 140 140" className={styles.donutSvg}>
          <circle cx="70" cy="70" r={radius} className={styles.donutTrack} />
          {data.map((d) => {
            const dash = (d.value / 100) * circumference;
            const el = (
              <circle
                key={d.label}
                cx="70"
                cy="70"
                r={radius}
                stroke={d.color}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offsetAcc}
                className={styles.donutSegment}
              />
            );
            offsetAcc += dash;
            return el;
          })}
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutTotal}>100%</span>
          <span className={styles.donutSub}>Students</span>
        </div>
      </div>
      <ul className={styles.legend}>
        {data.map((d) => (
          <li key={d.label}>
            <span className={styles.legendDot} style={{ background: d.color }} />
            {d.label}
            <strong>{d.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
