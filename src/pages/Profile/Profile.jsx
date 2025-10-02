import dayjs from "dayjs"
import { useSettings } from "../../context/useSettings"
import styles from "./Profile.module.scss"
import Button from "../../components/Button/Button"

export default function Profile() {
    const { settings, setSettings } = useSettings()

    const formatDate = (date) => {
        return dayjs(date).format(settings.dateFormat)
    }

    const handleClearData = () => {
        if (
            window.confirm("This will reset all local data (watchlists, settings, etc.). Continue?")
        ) {
            localStorage.clear()
            window.location.reload()
        }
    }

    return (
        <div className={styles.profile}>
            <h2>Profile</h2>

            <section>
                <h3>User Info</h3>
                <p>
                    <strong>Username:</strong> Guest
                </p>
                <p>
                    <strong>Theme:</strong>{" "}
                    {settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}
                </p>
            </section>

            <section>
                <h3>App Stats</h3>
                <p>
                    <strong>Last Active:</strong> {formatDate(new Date().toLocaleDateString())}
                </p>
            </section>

            <section>
                <h3>Quick Actions</h3>
                <Button onClick={handleClearData}>Reset All Data</Button>
            </section>
        </div>
    )
}
