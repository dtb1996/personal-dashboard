import { useEffect, useState } from "react"
import styles from "./Settings.module.scss"

export default function Settings({ theme, setTheme }) {
    return (
        <div className={styles.settings}>
            <h1>Settings</h1>
            <div className={styles.settingsEntry}>
                <label>Choose a theme:</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="forest">Forest</option>
                    <option value="ocean">Ocean</option>
                    <option value="pastel">Pastel</option>
                    <option value="cyberpunk">Cyberpunk</option>
                </select>
            </div>
        </div>
    )
}
