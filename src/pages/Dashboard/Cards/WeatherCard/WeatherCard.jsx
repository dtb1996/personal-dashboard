import { useEffect, useState } from "react"
import Card from "../../../../components/Card/Card"
import styles from "./WeatherCard.module.scss"
import { fetchWeather } from "../../../../utils/weather"

export default function WeatherCard() {
    const [coords, setCoords] = useState(null)
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)

    // Goelocation
    useEffect(() => {
        if (!coords) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        setCoords({
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude,
                        })
                    },
                    () => setError("Unable to access your location")
                )
            } else {
                setError("Geolocation not supported by your browser")
            }
        }
    }, [coords])

    // Weather fetch
    useEffect(() => {
        if (!coords) return

        const controller = new AbortController()

        const loadWeather = async () => {
            try {
                const data = await fetchWeather(coords)
                if (!controller.signal.aborted) {
                    setWeather(data)
                    setError(null)
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error(err)
                    setError("Could not load weather data")
                    setWeather(null)
                }
            }
        }

        loadWeather()
        return () => controller.abort()
    }, [coords])

    let content

    if (error) {
        content = (
            <div className={styles.error}>
                <p>
                    Could not load weather data.
                    <br />
                    {error}
                </p>
            </div>
        )
    } else if (weather) {
        content = (
            <div className={styles.content}>
                <div>
                    <div className={styles.temperature}>{Math.round(weather?.main?.temp)}</div>
                    <div className={styles.description}>
                        {weather?.weather[0]?.description.charAt(0).toUpperCase() +
                            weather?.weather[0]?.description.slice(1)}
                    </div>
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`}
                    alt={weather?.weather[0]?.description}
                />
            </div>
        )
    } else {
        content = <div>Loading...</div>
    }

    return (
        <Card
            title={error ? "Weather Unavailable" : weather?.name || "Weather"}
            content={content}
        />
    )
}
