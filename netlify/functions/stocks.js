export async function handler(event) {
    const API_KEY = process.env.VITE_STOCK_API_KEY

    // Check for parameters
    const symbol = event.queryStringParameters?.symbol || "AAPL"
    const from = event.queryStringParameters?.from || "2025-09-22"
    const to = event.queryStringParameters?.to || "2025-09-29"

    const url = `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=${symbol}&from=${from}&to=${to}&apikey=${API_KEY}`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            return { statusCode: res.status, body: JSON.stringify({ error: res.statusText }) }
        }

        const json = await res.json()
        const hist = Array.isArray(json)
            ? json
            : Array.isArray(json.historical)
              ? json.historical
              : []

        if (!hist.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No historical data returned" }),
            }
        }

        const data = hist
            .map((d) => ({
                symbol,
                date: d.date,
                price: d.price,
                volume: d.volume,
            }))
            .reverse()

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
    }
}
