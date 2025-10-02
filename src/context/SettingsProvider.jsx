import { useState, useEffect } from "react"
import { SettingsContext } from "./SettingsContext"

export function SettingsProvider({ children }) {
    const defaultSettings = {
        theme: "light",
        fontSize: "medium",
        dateFormat: "MM/DD/YYYY",
        refreshInterval: "5m",
    }

    const [settings, setSettings] = useState(() => {
        return JSON.parse(localStorage.getItem("appSettings")) || defaultSettings
    })

    useEffect(() => {
        localStorage.setItem("appSettings", JSON.stringify(settings))
    }, [settings])

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}
