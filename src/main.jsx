import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/global.scss"
import App from "./App.jsx"
import { SettingsProvider } from "./context/SettingsProvider.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SettingsProvider>
            <App />
        </SettingsProvider>
    </StrictMode>
)
