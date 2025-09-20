import Card from "../../components/Card/Card"
import styles from "./Dashboard.module.scss"

export default function Dashboard() {
    return (
        <div className={styles.dashboardGrid}>
            <Card title="Weather" content={"Sunny, 72°F"} />
            <Card title="Weather" content={"Sunny, 72°F"} />
            <Card title="Weather" content={"Sunny, 72°F"} />
            <Card title="Weather" content={"Sunny, 72°F"} />
        </div>
    )
}