import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import styles from "./App.module.scss";
import { useSwipeable } from "react-swipeable";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768 && sidebarOpen) {
                setSidebarOpen(false);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [sidebarOpen]);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const currentYear = new Date().getFullYear();

    const handlers = useSwipeable({
        onSwipedLeft: () => setSidebarOpen(false),
        onSwipedRight: () => setSidebarOpen(true),
        preventDefaultTouchmoveEvent: false,
    });

    return (
        <div className={styles.app}>
            <Sidebar sidebarOpen={sidebarOpen} />
            <div className={styles.mainCol}>
                <Header showSidebar={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
                <main>
                    <Dashboard />
                </main>
                <footer>
                    <p>Copyright &copy; {currentYear} Rolling Pixels. All rights reserved.</p>
                </footer>
            </div>

            {sidebarOpen && <div className={styles.backdrop} onClick={handleSidebarToggle} />}
            {/* <div className={styles.touchArea} {...handlers} /> */}
        </div>
    );
}

export default App;
