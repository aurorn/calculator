let operator = '';
let previousValue = '';
let currentValue = '';

let clear = document.querySelector("#clear-btn");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let previousScreen = document.querySelector(".previous");
let currentScreen = document.querySelector(".current");
let deleteButton = document.querySelector("#del-btn");

function handleNumberClick(num) {
    handleNumber(num);
    currentScreen.textContent = currentValue;
}

function handleOperatorClick(op) {
    handleOperator(op);
    previousScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = currentValue;
}


numbers.forEach((number) => number.addEventListener("click", function(e){
    handleNumberClick(e.target.textContent);
}));


operators.forEach((op) => op.addEventListener("click", function(e) {
    handleOperatorClick(e.target.textContent);
}));


clear.addEventListener("click", function(){
    previousValue = '';
    currentValue = '';
    operator = '';
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
})

equal.addEventListener("click", function(){
    if (currentValue != '' && previousValue != ''){
        calculate();
        previousScreen.textContent = '';
        if(previousValue.length <= 15){
            currentScreen.textContent = previousValue;
        } 
    }
})

decimal.addEventListener("click", function(){
    addDecimal();
})


function handleNumber(num){
    if (currentValue.length <= 5){
        currentValue += num;
    }
    
}

function handleOperator(op) {
    if (currentValue !== "") {
        if (previousValue !== "") {
            calculate(); 
            previousScreen.textContent = previousValue + " " + operator; 
        } else {
            previousValue = currentValue; 
            previousScreen.textContent = previousValue; 
        }
        operator = op; 
        currentValue = ''; 
    }
}

deleteButton.addEventListener("click", function() {
    
    handleBackspace();
});

function handleBackspace() {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
    currentValue = currentScreen.textContent;
}


function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    
    if (operator === "/" && currentValue === 0) {
        currentScreen.textContent = "Oh, look at you dividing by 0.";
        operator = '';
        currentValue = '';
        return; 
    }

    if(operator === "+"){
        previousValue += currentValue;
        currentValue = previousValue;
    } else if(operator === "-") {
        previousValue -= currentValue;
        currentValue = previousValue;
    } else if(operator === "X") {
        previousValue *= currentValue;
        currentValue = previousValue;
    } else{
        previousValue /= currentValue;
        currentValue = previousValue;
    }
      
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    

    currentScreen.textContent = currentValue;
    operator = '';
    currentValue = '';

}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}
 
function addDecimal() {
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
} 



function handleKeyboardInput(event) {
    
    const key = event.key;

    
    if (!isNaN(key) || key === ".") {
        handleNumber(key);
        currentScreen.textContent = currentValue;
    }

    
    if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }

   
    if (key === "Enter" || key === "=") {
        if (currentValue !== "" && previousValue !== "") {
            calculate();
            previousScreen.textContent = '';
            if (previousValue.length <= 15) {
                currentScreen.textContent = previousValue;
            }
        }
    }

   
    if (key === "c" || key === "C") {
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    }

    
    if (key === "Backspace") {
        handleBackspace();
    }
}


document.addEventListener("keydown", handleKeyboardInput); 




