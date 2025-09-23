import { useEffect, useState } from "react"
import Card from "../../../../components/Card/Card"
import styles from "./TodoCard.module.scss"

export default function TodoCard() {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState("")

    const STORAGE_KEY = "dashboardTodos"

    // Load todos from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            setTodos(JSON.parse(saved))
        }
    }, [])

    // Save todos to LocalStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    const handleAddTodo = (e) => {
        e.preventDefault()

        if (!newTodo.trim()) return

        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Date.now(), text: newTodo.trim(), completed: false },
        ])

        setNewTodo("")
    }

    const toggleTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const removeTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    const content = (
        <div className={styles.todoCard}>
            <ul className={styles.list}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => toggleTodo(todo.id)}
                        className={todo.completed ? styles.completed : ""}
                    >
                        <span>{todo.text}</span>
                        <button onClick={() => removeTodo(todo.id)}>X</button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    placeholder="Add new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )

    return <Card title="Todo List" content={content} />
}
