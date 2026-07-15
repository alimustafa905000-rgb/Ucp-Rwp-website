import styles from './Charts.module.css';

/**
 * Dependency-free animated area/line chart built from an SVG path.
 * data: number[] — a plain series of values.
 */
export default function LineChart({ data, title }) {
  const width = 480;
  const height = 160;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / span) * (height - 20) - 10;
    return [x, y];
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <div className={`${styles.chartCard} reveal`}>
      <div className={styles.chartHeader}>
        <h3>{title}</h3>
        <span className={styles.chartBadge}>Last 8 weeks</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.lineSvg} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--blue-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#lineFill)" className={styles.lineArea} />
        <path d={linePath} className={styles.linePath} />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" className={styles.linePoint} />
        ))}
      </svg>
    </div>
  );
}
