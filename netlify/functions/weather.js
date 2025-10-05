export async function handler(_event) {
    const API_KEY = process.env.VITE_WEATHER_API_KEY
    const lat = "43.14116777737955"
    const lon = "-72.44858329414396"

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`

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
