import { useState, useEffect } from "react"
import Card from "../../../../components/Card/Card"
import Button from "../../../../components/Button/Button"
import styles from "./NewsCard.module.scss"
import { fetchNews } from "../../../../utils/news"

export default function NewsCard() {
    const [news, setNews] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetchNews({ signal })
            .then((data) => {
                setNews(data)
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setNews(null)
            })

        return () => {
            controller.abort()
        }
    }, [])

    let content

    if (error) {
        content = (
            <div className={styles.error}>
                <p>
                    Could not load news data.
                    <br />
                    {error}
                </p>
            </div>
        )
    } else if (news) {
        content = (
            <div className={styles.list}>
                {news.articles.map((article, idx) => (
                    <a
                        key={idx}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.article}
                    >
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className={styles.thumbnail}
                            />
                        )}
                        <div className={styles.info}>
                            <h3 className={styles.title}>
                                {article.title.length > 80
                                    ? article.title.slice(0, 80) + "..."
                                    : article.title}
                            </h3>
                            {article.source?.name && (
                                <p className={styles.source}>{article.source.name}</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        )
    } else {
        content = <div>Loading...</div>
    }

    return <Card title="Top Headlines in the US" content={content} />
}
