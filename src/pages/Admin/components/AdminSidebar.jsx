import { Link } from 'react-router-dom';
import { adminNavItems } from '../data/adminData';
import styles from './AdminSidebar.module.css';

/**
 * Props:
 *  - activeTab / onSelect: controls which section is shown
 *  - open: whether the mobile drawer is open
 *  - onClose: closes the mobile drawer (backdrop click / link click)
 */
export default function AdminSidebar({ activeTab, onSelect, open, onClose }) {
  return (
    <>
      {/* Backdrop only shows on mobile when the drawer is open */}
      <div className={`${styles.backdrop} ${open ? styles.backdropVisible : ''}`} onClick={onClose} />

      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.brand}>
          {/* Add your logo file at: src/assets/logos/logo1.png (or reuse public/images/logo1.jpeg) */}
          <img src="/images/logo1.jpeg" alt="UCP Logo" onError={(e) => { e.target.style.background = 'rgba(255,255,255,0.15)'; }} />
          <div>
            <div className={styles.brandName}>UCP Admin</div>
            <div className={styles.brandSub}>Campus Console</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {adminNavItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
              onClick={() => {
                onSelect(item.id);
                onClose();
              }}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.backLink}>
            <i className="fas fa-arrow-left"></i> Back to website
          </Link>
        </div>
      </aside>
    </>
  );
}
