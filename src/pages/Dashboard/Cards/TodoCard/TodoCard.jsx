import { useEffect, useRef, useState } from "react"
import Card from "../../../../components/Card/Card"
import styles from "./TodoCard.module.scss"
import Button from "../../../../components/Button/Button"

export default function TodoCard() {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState("")

    const didMount = useRef(false)

    // Load todos from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("dashboardTodos")
        if (saved) {
            setTodos(JSON.parse(saved))
        }
    }, [])

    // Save todos to LocalStorage
    useEffect(() => {
        if (didMount.current) {
            localStorage.setItem("dashboardTodos", JSON.stringify(todos))
        } else {
            didMount.current = true
        }
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
                        <Button onClick={() => removeTodo(todo.id)}>X</Button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddTodo}>
                <input
                    name="addTodo"
                    type="text"
                    placeholder="Add new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <Button type="submit" className={styles.button}>
                    Add
                </Button>
            </form>
        </div>
    )

    return <Card title="Todo List" content={content} />
}
