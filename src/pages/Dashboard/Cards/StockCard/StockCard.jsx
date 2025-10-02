import { useEffect, useState } from "react"
import Button from "../../../../components/Button/Button"
import Card from "../../../../components/Card/Card"
import styles from "./StockCard.module.scss"
import { fetchPriceFromSymbol } from "../../../../utils/stocks"
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { useSettings } from "../../../../context/useSettings"
import dayjs from "dayjs"

export default function StockCard() {
    const [watchlist, setWatchlist] = useState(
        JSON.parse(localStorage.getItem("watchlist")) || ["AAPL", "NVDA", "MSFT"]
    )
    const [activeSymbol, setActiveSymbol] = useState(watchlist[0] || null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newSymbol, setNewSymbol] = useState("")

    const { settings } = useSettings()

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])

    useEffect(() => {
        if (!activeSymbol || settings.refreshInterval === "off") {
            setData(null)
            setError(null)
            setLoading(false)
            return
        }

        let interval

        const controller = new AbortController()
        const signal = controller.signal

        setLoading(true)
        setError(null)

        const fetchData = () => {
            fetchPriceFromSymbol(activeSymbol, { signal })
                .then((data) => {
                    setData(data)
                    setError(null)
                })
                .catch((err) => {
                    setError(err.message)
                    setData(null)
                })
                .finally(() => setLoading(false))
        }

        fetchData()

        const ms =
            settings.refreshInterval === "30s"
                ? 30000
                : settings.refreshInterval === "1m"
                  ? 60000
                  : 300000

        interval = setInterval(fetchData, ms)

        return () => {
            controller.abort()
            clearInterval(interval)
        }
    }, [activeSymbol])

    const handleSetActive = (symbol) => setActiveSymbol(symbol)

    const handleAddSymbol = () => {
        const symbol = newSymbol.trim().toUpperCase()
        if (!symbol) return

        if (watchlist.includes(symbol)) {
            alert("Symbol already in watchlist")
            return
        }

        if (watchlist.length >= 3) {
            alert("You can only add up to 3 symbols")
            return
        }

        setWatchlist((prev) => [...prev, symbol])
        setActiveSymbol(symbol)
        setNewSymbol("")
    }

    const handleRemoveSymbol = (symbol) => {
        const updated = watchlist.filter((s) => s !== symbol)

        setWatchlist(updated)

        if (activeSymbol === symbol) {
            setActiveSymbol(updated[0] || null)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddSymbol()
        }
    }

    const formatDate = (date) => {
        return dayjs(date).format(settings.dateFormat.slice(0, 5))
    }

    let content

    content = (
        <div className={styles.content}>
            {/* Add symbols */}
            <div className={styles.manage}>
                <input
                    type="text"
                    placeholder="Add symbol..."
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={handleAddSymbol}>
                    Add
                </Button>
            </div>

            {watchlist.length > 0 && (
                <>
                    {/* Symbol selector */}
                    <div className={styles.dropdown}>
                        <label>Choose a symbol to view:</label>
                        <select
                            value={activeSymbol}
                            onChange={(e) => handleSetActive(e.target.value)}
                        >
                            {watchlist.map((symbol) => (
                                <option key={symbol} value={symbol}>
                                    {symbol}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chart */}
                    {loading && <div>Loading chart...</div>}
                    {error && <div className={styles.error}>Could not load data: {error}</div>}
                    {!loading && data && (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid
                                    stroke="var(--color-bg-highlight)"
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(date) => formatDate(date)}
                                    tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
                                    axisLine={{ stroke: "var(--color-text-muted)" }}
                                    tickLine={{ stroke: "var(--color-text-muted)" }}
                                />
                                <YAxis
                                    tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
                                    axisLine={{ stroke: "var(--color-text-muted)" }}
                                    tickLine={{ stroke: "var(--color-text-muted)" }}
                                    domain={["dataMin - 2", "dataMax + 2"]}
                                    tickFormatter={(val) => `$${val}`}
                                />
                                <Tooltip
                                    wrapperStyle={{
                                        backgroundColor: "var(--color-bg-light)",
                                        color: "var(--color-text)",
                                        borderRadius: "4px",
                                        border: "1px solid var(--color-bg-highlight)",
                                    }}
                                    labelStyle={{ fontWeight: "bold", color: "var(--color-text)" }}
                                />
                                <Legend wrapperStyle={{ color: "var(--color-text)" }} />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="var(--color-primary)"
                                    strokeWidth={2}
                                    dot={{
                                        stroke: "var(--color-primary)",
                                        fill: "var(--color-primary)",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </>
            )}

            {/* Remove buttons */}
            {watchlist.length > 0 && (
                <ul className={styles.removeList}>
                    {watchlist.map((symbol) => (
                        <li key={symbol}>
                            {symbol}
                            <button type="button" onClick={() => handleRemoveSymbol(symbol)}>
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {watchlist.length === 0 && <div>No symbols in watchlist. Add one above.</div>}
        </div>
    )

    return <Card title="Stock Watchlist" content={content} />
}
