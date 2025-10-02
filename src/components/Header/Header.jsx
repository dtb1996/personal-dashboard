import { useEffect, useState } from "react"
import styles from "./Header.module.scss"
import { GiHamburgerMenu } from "react-icons/gi"
import dayjs from "dayjs"
import { useSettings } from "../../context/useSettings"

export default function Header({ showSidebar, sidebarOpen }) {
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
            <div className={styles.buttons}>
                {!sidebarOpen && (
                    <button className={styles.toggle} onClick={showSidebar}>
                        <GiHamburgerMenu />
                    </button>
                )}
            </div>
            <div>My Dashboard</div>
            <div>{formatDate(currentDate.toLocaleDateString())}</div>
        </header>
    )
}
