function countNumber(obj: string) {
    const number = Function('"use strict";return (' + obj + ')')();
    return parseFloat(number)
}

const complete = (bool: Function, n: ref) => {
    bool() >= 0 && (n.value = n.value.substring(0, n.value.length - 1))
    n.value = countNumber(n.value).toString()
}

interface ref {
    value: string
}

export const calc = (n: ref, innerText: string) => {
    const bool = () => ["+", "-", "."].indexOf(n.value.charAt(n.value.length - 1))
    if (innerText === "清除") {
        n.value = ""
    } else if (innerText === "+") {
        complete(bool, n)
        bool() < 0 && (n.value += "+")
    } else if (innerText === "-") {
        complete(bool, n)
        bool() < 0 && (n.value += "-")
    } else if (innerText === "完成") {
        if (n.value === "") {
            n.value = "0"
        }
        complete(bool, n)
    } else if (innerText === ".") {
        if (n.value.charAt(n.value.length - 1) === ".") {
            return
        } else if (n.value.charAt(n.value.length - 1) === "" && n.value.charAt(n.value.length - 2) === "") {
            n.value += "0."
            return
        } else {
            n.value += "."
        }
    } else {
        n.value += innerText
    }
}


