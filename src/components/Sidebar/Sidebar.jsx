import styles from "./Sidebar.module.scss"

export default function Sidebar({ sidebarOpen, openPage }) {
    return (
        <aside className={styles.sidebar + " " + (sidebarOpen ? styles.show : null)}>
            <div className={styles.title}>Dashboard</div>
            <nav>
                <div className={styles.navItem} onClick={() => openPage("dashboard")}>
                    Home
                </div>
                <div className={styles.navItem} onClick={() => openPage("settings")}>
                    Settings
                </div>
                <div className={styles.navItem} onClick={() => openPage("profile")}>
                    Profile
                </div>
            </nav>
        </aside>
    )
}
