export async function getStocks(symbol, { signal } = {}) {
    // Use the Netlify functions URL if available
    const useFunction = import.meta.env.VITE_NETLIFY_FUNCTIONS === "true"

    const from = "2025-09-22"
    const to = "2025-09-29"

    const url = useFunction
        ? `/.netlify/functions/stocks?symbol=${symbol}&from=${from}&to=${to}`
        : `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=${symbol}&from=${from}&to=${to}&apikey=${import.meta.env.VITE_STOCK_API_KEY}`

    const res = await fetch(url, { signal })

    if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status}`)
    }

    return res.json()
}
