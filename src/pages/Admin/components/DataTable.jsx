import styles from './DataTable.module.css';

const statusClass = {
  Published: styles.statusPublished,
  Draft: styles.statusDraft,
  Scheduled: styles.statusScheduled,
};

/**
 * Responsive table: renders as a normal <table> on tablet/desktop,
 * and collapses into stacked glass cards on narrow mobile screens
 * (handled purely with CSS — see DataTable.module.css).
 * rows: [{ id, title, category, date, status }]
 */
export default function DataTable({ rows, title }) {
  return (
    <div className={`${styles.tableCard} reveal`}>
      <div className={styles.tableHeader}>
        <h3>{title}</h3>
        <button className={styles.viewAllBtn}>View all</button>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table} data-label="Notices">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td data-label="Title">{row.title}</td>
                <td data-label="Category">{row.category}</td>
                <td data-label="Date">{row.date}</td>
                <td data-label="Status">
                  <span className={`${styles.status} ${statusClass[row.status] || ''}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
