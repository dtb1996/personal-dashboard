import { useEffect, useState } from "react"
import styles from "./Header.module.scss"
import { GiHamburgerMenu } from "react-icons/gi"
import dayjs from "dayjs"
import { useSettings } from "../../context/useSettings"

export default function Header({ showSidebar }) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const { settings } = useSettings()

    const formatDate = (date) => {
        return dayjs(date).format(settings.dateFormat)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <header className={styles.header}>
            <button className={styles.toggle} onClick={showSidebar}>
                <GiHamburgerMenu />
            </button>
            <h4>My Dashboard</h4>
            <h4>{formatDate(currentDate.toLocaleDateString())}</h4>
        </header>
    )
}
