export function calculate(previous, operator, current) {
    const prev = Number(previous)
    const curr = Number(current)

    if (isNaN(prev) || isNaN(curr)) return "Error"

    switch (operator) {
        case "/":
            return curr === 0 ? "Error" : prev / curr
        case "*":
            return prev * curr
        case "-":
            return prev - curr
        case "+":
            return prev + curr
        default:
            return curr
    }
}
