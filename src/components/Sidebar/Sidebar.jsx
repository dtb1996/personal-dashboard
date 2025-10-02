import styles from "./Sidebar.module.scss"

export default function Sidebar({ sidebarOpen, setSidebarOpen, openPage }) {
    return (
        <aside className={styles.sidebar + " " + (sidebarOpen ? styles.show : null)}>
            <div className={styles.title}>Dashboard</div>
            <nav>
                <div
                    className={styles.navItem}
                    onClick={() => {
                        openPage("dashboard")
                        setSidebarOpen(false)
                    }}
                >
                    Home
                </div>
                <div
                    className={styles.navItem}
                    onClick={() => {
                        openPage("settings")
                        setSidebarOpen(false)
                    }}
                >
                    Settings
                </div>
                <div
                    className={styles.navItem}
                    onClick={() => {
                        openPage("profile")
                        setSidebarOpen(false)
                    }}
                >
                    Profile
                </div>
            </nav>
        </aside>
    )
}
