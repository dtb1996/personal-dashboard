import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Dashboard from "./pages/Dashboard/Dashboard"
import styles from "./App.module.scss"
// import { useSwipeable } from "react-swipeable"
import Settings from "./pages/Settings/Settings"
import { useSettings } from "./context/useSettings"
import Profile from "./pages/Profile/Profile"

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [page, setPage] = useState("dashboard")
    const { settings } = useSettings()

    useEffect(() => {
        document.body.classList.remove("small-font", "medium-font", "large-font")
        document.body.classList.add(`${settings.fontSize}-font`)
    }, [settings.fontSize])

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", settings.theme)
    }, [settings.theme])

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768 && sidebarOpen) {
                setSidebarOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [sidebarOpen])

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const currentYear = new Date().getFullYear()

    // const handlers = useSwipeable({
    //     onSwipedLeft: () => setSidebarOpen(false),
    //     onSwipedRight: () => setSidebarOpen(true),
    //     preventDefaultTouchmoveEvent: false,
    // })

    return (
        <div className={styles.app}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} openPage={setPage} />
            <div className={styles.mainCol}>
                <Header showSidebar={() => setSidebarOpen(true)} />
                <main>
                    {page === "dashboard" && <Dashboard />}
                    {page === "settings" && <Settings />}
                    {page === "profile" && <Profile />}
                </main>
                <footer>
                    <p>Copyright &copy; {currentYear} Rolling Pixels. All rights reserved.</p>
                </footer>
            </div>

            {sidebarOpen && <div className={styles.backdrop} onClick={handleSidebarToggle} />}
            {/* <div className={styles.touchArea} {...handlers} /> */}
        </div>
    )
}

export default App
