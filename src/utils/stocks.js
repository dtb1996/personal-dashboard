import dayjs from "dayjs"

export async function getStocks(symbol, { signal } = {}) {
    const from = dayjs().subtract(7, "day").format("YYYY-MM-DD")
    const to = dayjs().format("YYYY-MM-DD")

    const res = await fetch(`/.netlify/functions/stocks?symbol=${symbol}&from=${from}&to=${to}`, {
        signal,
    })

    if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status}`)
    }

    return res.json()
}
