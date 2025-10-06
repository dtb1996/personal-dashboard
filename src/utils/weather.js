export async function fetchWeather(coords, { signal } = {}) {
    if (!coords) throw new Error("Coordinates are required")

    const CACHE_TTL = 10 * 60 * 1000

    const { lat, lon } = coords
    const cacheKey = `weather_${lat}_${lon}`

    // Check cache
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
        const parsed = JSON.parse(cached)
        const age = Date.now() - parsed.timestamp
        if (age < CACHE_TTL) return parsed.data
    }

    // Fetch fresh
    const res = await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${lon}`, {
        signal,
    })

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)

    const data = await res.json()

    // Save cache
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))

    return data
}
