import { useEffect, useState } from "react"
import styles from "./JokeCard.module.scss"
import Card from "../../../../components/Card/Card"
import Button from "../../../../components/Button/Button"

export default function JokeCard() {
    const [joke, setJoke] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchJoke = () => {
        setLoading(true)
        fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error ${res.status}`)
                }
                return res.json()
            })
            .then((data) => {
                setJoke(data)
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setJoke(null)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchJoke()
    }, [])

    let content

    if (loading) {
        content = <p>Loading joke...</p>
    } else if (error) {
        content = (
            <div>
                <p>Couldn't load a joke</p>
                <button onClick={fetchJoke}>Try again</button>
            </div>
        )
    } else if (joke) {
        content = (
            <blockquote aria-live="polite">
                <div className={styles.joke}>
                    {joke.type === "twopart" ? (
                        <>
                            <p className={styles.setup}>{joke.setup}</p>
                            <p className={styles.delivery}>{joke.delivery}</p>
                        </>
                    ) : (
                        <p className={styles.single}>{joke.joke}</p>
                    )}
                </div>
                <Button onClick={fetchJoke}>Get Another</Button>
            </blockquote>
        )
    }

    return <Card title="Random Joke" content={content} />
}
