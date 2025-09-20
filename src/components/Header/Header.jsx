import styles from "./Header.module.scss"

export default function Header() {
    return (
        <header className={styles.header}>
            <div>My Dashboard</div>
            <div>Sep 19, 2025</div>
        </header>
    )
}