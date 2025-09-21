import { useState, useEffect } from 'react'
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Dashboard from './pages/Dashboard/Dashboard'
import styles from "./App.module.scss"
import { useSwipeable } from 'react-swipeable'

function App() {
  const [theme, setTheme] = useState("dark")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
        setTheme(savedTheme)
        document.documentElement.setAttribute("data-theme", savedTheme)
        return
    }

    // Check for system theme preference
    const prefersLight = window.matchMedia("(prefers-color-scheme: light").match
    if (prefersLight) {
        setTheme("light")
        document.documentElement.setAttribute("data-theme", "light")
    } else {
        document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarOpen])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme) 
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const currentYear = new Date().getFullYear()

  const handlers = useSwipeable({
    onSwipedLeft: () => setSidebarOpen(false),
    onSwipedRight: () => setSidebarOpen(true),
    preventDefaultTouchmoveEvent: false
  })

  return (
    <div data-theme={theme} className={styles.app}>
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className={styles.mainCol}>
        <header>
          <Header />
        </header>
        <main>
          <button onClick={toggleTheme}>Toggle theme</button>
          <button onClick={handleSidebarToggle}>Show Sidebar</button>
          <Dashboard />
        </main>
        <footer>
          <p>Copyright &copy; {currentYear} Rolling Pixels. All rights reserved.</p>
        </footer>
      </div>

      {sidebarOpen && (<div className={styles.backdrop} onClick={handleSidebarToggle} />)}
      {/* <div className={styles.touchArea} {...handlers} /> */}
    </div>
  )
}

export default App
