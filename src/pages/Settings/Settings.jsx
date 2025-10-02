import Button from "../../components/Button/Button"
import styles from "./Settings.module.scss"
import { useSettings } from "../../context/useSettings"

export default function Settings() {
    const { settings, setSettings } = useSettings()

    const handleChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }))
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
        <div className={styles.settings}>
            <h2>App Settings</h2>

            {/* Theme */}
            <div className={styles.setting}>
                <label>Theme:</label>
                <select
                    value={settings.theme}
                    onChange={(e) => handleChange("theme", e.target.value)}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="forest">Forest</option>
                    <option value="ocean">Ocean</option>
                    <option value="pastel">Pastel</option>
                    <option value="cyberpunk">Cyberpunk</option>
                </select>
            </div>

            {/* Font size */}
            <div className={styles.setting}>
                <label>Font size:</label>
                <select
                    value={settings.fontSize}
                    onChange={(e) => handleChange("fontSize", e.target.value)}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>

            {/* Date format */}
            <div className={styles.setting}>
                <label>Date format:</label>
                <select
                    value={settings.dateFormat}
                    onChange={(e) => handleChange("dateFormat", e.target.value)}
                >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                </select>
            </div>

            {/* Refresh interval */}
            <div className={styles.setting}>
                <label>Auto-refresh stock data:</label>
                <select
                    value={settings.refreshInterval}
                    onChange={(e) => handleChange("refreshInterval", e.target.value)}
                >
                    <option value="off">Off</option>
                    <option value="30s">Every 30s</option>
                    <option value="1m">Every 1m</option>
                    <option value="5m">Every 5m</option>
                </select>
            </div>

            {/* Reset button */}
            <div className={styles.actions}>
                <Button onClick={handleClearData}>Clear Local Data</Button>
            </div>
        </div>
    )
}
