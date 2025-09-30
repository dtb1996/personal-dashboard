import Card from "../../components/Card/Card"
import CalculatorCard from "./Cards/CalculatorCard/CalculatorCard"
import JokeCard from "./Cards/JokeCard/JokeCard"
import NewsCard from "./Cards/NewsCard/NewsCard"
import StockCard from "./Cards/StockCard/StockCard"
import TodoCard from "./Cards/TodoCard/TodoCard"
import WeatherCard from "./Cards/WeatherCard/WeatherCard"
import styles from "./Dashboard.module.scss"

export default function Dashboard() {
    return (
        <div className={styles.dashboardGrid}>
            <WeatherCard />
            <TodoCard />
            <CalculatorCard />
            <JokeCard />
            <NewsCard />
            <StockCard />
        </div>
    )
}
