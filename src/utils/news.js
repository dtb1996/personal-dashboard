export async function fetchNews({ signal } = {}) {
    const isLocal = window.location.hostname === "localhost"
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY

    const url = isLocal
        ? `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        : "/netlify/functions/news"

    const res = await fetch(url, { signal })

    if (!res.ok) {
        throw new Error(`Error ${res.status}`)
    }

    return res.json()
}
