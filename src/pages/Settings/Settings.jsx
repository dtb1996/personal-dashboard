import { useEffect, useState } from "react"

export default function Settings({ theme, setTheme }) {
    return (
        <>
            <h1>Settings</h1>
            <p>Choose a theme:</p>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="forest">Forest</option>
                <option value="ocean">Ocean</option>
                <option value="pastel">Pastel</option>
                <option value="cyberpunk">Cyberpunk</option>
            </select>
        </>
    )
}
