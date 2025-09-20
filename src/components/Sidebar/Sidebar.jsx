import styles from "./Sidebar.module.scss"

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.title}>Dashboard</div>
            <nav>
                <div className={styles.navItem}>Home</div>
                <div className={styles.navItem}>Settings</div>
                <div className={styles.navItem}>Profile</div>
            </nav>
        </aside>
    )
}