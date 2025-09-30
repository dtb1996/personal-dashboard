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

export default function StockCard() {
    const [watchlist, setWatchlist] = useState(
        JSON.parse(localStorage.getItem("watchlist")) || ["AAPL", "NVDA", "MSFT"]
    )
    const [activeSymbol, setActiveSymbol] = useState(watchlist[0] || null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [newSymbol, setNewSymbol] = useState("")

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])

    useEffect(() => {
        if (!activeSymbol) return

        const controller = new AbortController()
        const signal = controller.signal

        fetchPriceFromSymbol(activeSymbol, { signal })
            .then((data) => {
                setData(data)
                setError(null)
                console.log(data)
            })
            .catch((err) => {
                setError(err.message)
                setData(null)
            })

        return () => {
            controller.abort()
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

    let content

    if (error) {
        content = (
            <div className={styles.error}>
                <p>
                    Could not load news data.
                    <br />
                    {error}
                </p>
            </div>
        )
    } else if (data) {
        content = (
            <div className={styles.content}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="var(--color-bg-highlight)" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
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
                            dot={{ stroke: "var(--color-primary)", fill: "var(--color-primary)" }}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <div className={styles.list}>
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
                </div>
            </div>
        )
    } else {
        content = <div>Loading...</div>
    }

    return <Card title="Stock Watchlist" content={content} />
}
