let operator = '';
let previousValue = '';
let currentValue = '';

let clearButton = document.querySelector("#clear-btn");
let equalButton = document.querySelector(".equal");
let decimalButton = document.querySelector(".decimal");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let previousScreen = document.querySelector(".previous");
let currentScreen = document.querySelector(".current");
let deleteButton = document.querySelector("#del-btn");

function handleNumberClick(num) {
    handleNumber(num);
    updateCurrentScreen();
}

function handleOperatorClick(op) {
    handleOperator(op);
    updatePreviousScreen();
    updateCurrentScreen();
}

numbers.forEach((number) => number.addEventListener("click", (e) => {
    handleNumberClick(e.target.textContent);
}));

operators.forEach((op) => op.addEventListener("click", (e) => {
    handleOperatorClick(e.target.textContent);
}));

clearButton.addEventListener("click", clearCalculator);
equalButton.addEventListener("click", handleEqualClick);
decimalButton.addEventListener("click", addDecimal);
deleteButton.addEventListener("click", handleBackspace);
document.addEventListener("keydown", handleKeyboardInput);

function handleNumber(num) {
    if (currentValue.length <= 5) {
        currentValue += num;
    }
}

function handleOperator(op) {
    if (currentValue !== "") {
        if (previousValue !== "") {
            calculate();
            updatePreviousScreen();
        } else {
            previousValue = currentValue;
            updatePreviousScreen();
        }
        operator = op;
        currentValue = '';
    }
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === "/" && currentValue === 0) {
        currentScreen.textContent = "Oh, look at you dividing by Zero.";
        operator = '';
        currentValue = '';
        return;
    }

    switch (operator) {
        case "+":
            previousValue += currentValue;
            break;
        case "-":
            previousValue -= currentValue;
            break;
        case "*":
            previousValue *= currentValue;
            break;
        case "/":
            previousValue /= currentValue;
            break;
    }

    previousValue = roundNumber(previousValue);
    currentScreen.textContent = previousValue;
    operator = '';
    currentValue = '';
}

function clearCalculator() {
    previousValue = '';
    currentValue = '';
    operator = '';
    updatePreviousScreen();
    updateCurrentScreen();
}

function handleEqualClick() {
    if (currentValue !== '' && previousValue !== '') {
        calculate();
        previousScreen.textContent = '';
    }
}

function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += '.';
    }
    updateCurrentScreen();
}

function handleBackspace() {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
    currentValue = currentScreen.textContent;
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function handleKeyboardInput(event) {
    const key = event.key;
    if (!isNaN(key) || key === ".") {
        handleNumber(key);
        updateCurrentScreen();
    }

    if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
        updatePreviousScreen();
        updateCurrentScreen();
    }

    if (key === "Enter" || key === "=") {
        handleEqualClick();
    }

    if (key === "c" || key === "C") {
        clearCalculator();
    }

    if (key === "Backspace") {
        handleBackspace();
    }
}

function updatePreviousScreen() {
    previousScreen.textContent = previousValue + " " + operator;
}

function updateCurrentScreen() {
    currentScreen.textContent = currentValue;
}
