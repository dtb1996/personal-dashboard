import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header({ showSidebar, sidebarOpen }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.buttons}>
                <ThemeToggle />
                {!sidebarOpen && (
                    <button className={styles.toggle} onClick={showSidebar}>
                        <GiHamburgerMenu />
                    </button>
                )}
            </div>
            <div>My Dashboard</div>
            <div>{currentDate.toLocaleDateString()}</div>
        </header>
    );
}
