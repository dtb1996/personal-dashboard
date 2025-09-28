export async function fetchNews() {
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY

    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

    if (!res.ok) {
        throw new Error(`Error ${res.status}`)
    }

    return res.json()
}
