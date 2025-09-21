import styles from "./Header.module.scss"

export default function Header() {
    return (
        <div className={styles.header}>
            <div>My Dashboard</div>
            <div>Sep 19, 2025</div>
        </div>
    )
}