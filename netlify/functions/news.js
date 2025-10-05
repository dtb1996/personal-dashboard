exports.handler = async function (event, context) {
    const API_KEY = process.env.NEWS_API_KEY
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            return { statusCode: res.status, body: JSON.stringify({ error: res.statusText }) }
        }

        const data = await res.json()
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
    }
}
