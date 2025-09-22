import styles from "./Card.module.scss";

export default function Card({ title, content }) {
    return (
        <div className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
        </div>
    );
}
