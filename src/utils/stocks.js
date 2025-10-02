const API_KEY = import.meta.env.VITE_STOCK_API_KEY

export async function fetchPriceFromSymbol(symbol, { signal }) {
    const from = "2025-09-22"
    const to = "2025-09-29"

    const res = await fetch(
        `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=${symbol}&from=${from}&to=${to}&apikey=${API_KEY}`,
        signal
    )

    if (!res.ok) {
        throw new Error(`Failed to fetch stock price: ${res.status}`)
    }

    const json = await res.json()

    const hist = Array.isArray(json) ? json : Array.isArray(json.historical) ? json.historical : []

    if (!hist.length) {
        throw new Error("No historical data returned")
    }

    return hist
        .map((d) => ({
            symbol,
            date: d.date,
            price: d.price,
            volume: d.volume,
        }))
        .reverse()
}
