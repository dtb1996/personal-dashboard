import { useState, useEffect } from 'react'
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [theme, setTheme] = useState("dark")

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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme) 
  }

  return (
    <div data-theme={theme} style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ padding: "1rem", flex: 1 }}>
          <Dashboard />
          <button onClick={toggleTheme}>Toggle theme</button>
        </main>
      </div>
    </div>
  )
}

export default App
