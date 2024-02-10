let operator = '';
let previousValue1 = '';
let previousValue2 = '';
let currentValue = '';
let answer = '';

let clearButton = document.querySelector("#clear-btn");
let equalButton = document.querySelector(".equal");
let decimalButton = document.querySelector(".decimal");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let previousScreen = document.querySelector(".previous");
let currentScreen = document.querySelector(".current");
let deleteButton = document.querySelector("#del-btn");

function handleNumberClick(num) {
    if (answer !== '') {
        clearCalculator();
    }
    handleNumber(num);
    updateCurrentScreen();
}

function handleOperatorClick(op) {
    if (answer !== '') {
        previousValue1 = answer;
        previousScreen.textContent = previousValue1 + ' ' + op + ' ';
        operator = op;
        answer = '';
        currentValue = '';
    } else {
        handleOperator(op);
        updatePreviousScreen();
        updateCurrentScreen();
    }
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
    if (currentValue.length <= 8) {
        currentValue += num;
    }
}

function handleOperator(op) {
    if (currentValue !== "") {
        if (previousValue1 !== "" && operator !== '') {
            calculate();
        } else {
            previousValue1 = currentValue;
            previousScreen.textContent = previousValue1 + ' ' + op + ' ';
        }
        operator = op;
        currentValue = '';
    } else if (previousValue1 !== '' && previousValue2 !== '') {
        operator = op;
        previousScreen.textContent = previousValue2 + ' ' + op + ' ';
    }
}

function calculate(){
    previousValue1 = Number(previousValue1);
    currentValue = Number(currentValue);
    
    if (operator === "/" && currentValue === 0) {
        currentScreen.textContent = "Oh, look at you dividing by 0.";
        operator = '';
        currentValue = '';
        return; 
    }

    if(operator === "+"){
        previousValue1 += currentValue;
    } else if(operator === "-") {
        previousValue1 -= currentValue;
    } else if(operator === "X") {
        previousValue1 *= currentValue;
    } else{
        previousValue1 /= currentValue;
    }
      
    previousValue1 = roundNumber(previousValue1);
    currentValue = previousValue1.toString();
    
    currentScreen.textContent = currentValue;
    
    operator = ''; // Reset operator after calculation
    currentValue = ''; // Reset currentValue after calculation
}

function clearCalculator() {
    previousValue1 = '';
    previousValue2 = '';
    currentValue = '';
    operator = '';
    answer = '';
    updatePreviousScreen();
    updateCurrentScreen();
}

function handleEqualClick() {
    if (previousValue1 !== '' && operator !== '') {
        calculate();
        answer = previousValue1; // Store the result as answer
        currentScreen.textContent = answer;
        previousScreen.textContent = ''; // Clear the previous screen
        previousValue2 = previousValue1;
        previousValue1 = '';
        operator = '';
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
    let previousExpression = previousValue1 + ' ' + operator + ' ' + previousValue2;
    if (previousExpression.length > 10) {
        previousScreen.textContent = previousExpression.substring(0, 14) + '...';
    } else {
        previousScreen.textContent = previousExpression;
    }
}

function updateCurrentScreen() {
    let displayValue = currentValue;
    if (displayValue.length > 10) {
        displayValue = displayValue.substring(0, 14) + '...';
    }
    currentScreen.textContent = displayValue;
}
