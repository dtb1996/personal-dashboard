import { useState } from "react"
import styles from "./CalculatorCard.module.scss"
import { calculate } from "../../../../utils/calculator"
import Card from "../../../../components/Card/Card"
import Button from "../../../../components/Button/Button"

const keys = [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "/", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "*", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "0", type: "number" },
    { label: ".", type: "decimal" },
    { label: "=", type: "equals" },
    { label: "+", type: "operator" },
    { label: "Clear", type: "clear" },
]

export default function CalculatorCard() {
    const [calc, setCalc] = useState({
        display: "0",
        previous: null,
        operator: null,
    })

    const handleClick = (key) => {
        setCalc((prev) => {
            switch (key.type) {
                case "number":
                    return {
                        ...prev,
                        display: prev.display === "0" ? key.label : prev.display + key.label,
                    }

                case "decimal":
                    if (prev.display.includes(".")) return prev
                    return {
                        ...prev,
                        display: prev.display + ".",
                    }

                case "operator":
                    return {
                        previous: prev.display,
                        operator: key.label,
                        display: "0",
                    }

                case "equals":
                    if (!prev.previous || !prev.operator) return prev

                    {
                        const result = calculate(prev.previous, prev.operator, prev.display)
                        return {
                            display: String(result),
                            previous: result,
                            operator: null,
                        }
                    }

                case "clear":
                    return { display: "0", previous: null, operator: null }

                default:
                    return prev
            }
        })
    }

    const content = (
        <div className={styles.calculator}>
            <h2 className={styles.display}>{calc.display}</h2>
            <div className={styles.keys}>
                {keys.map((key) => (
                    <Button key={key.label} onClick={() => handleClick(key)}>
                        {key.label}
                    </Button>
                ))}
            </div>
        </div>
    )

    return <Card title={"Calculator"} content={content} />
}
