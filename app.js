/*
let isOn = false;

const btnOnOff = document.querySelector("#on-off");

btnOnOff.onclick = powerCalc;

function powerCalc() {
    const ledPower = document.querySelector("#led-display");
    const screenText = document.querySelector("#screen-text");

    if(isOn) {
        ledPower.style["background-color"] = "#592326";
        btnOnOff.textContent = "on";
        screenText.textContent = "";
        isOn = false;
        return;
    }
    
    Inicializing the calculator
    isOn = true;
    ledPower.style["background-color"] = "#ed4c6e";
    btnOnOff.textContent = "off";
    screenText.textContent = "_";         
    let lastOperand = "0";
    let currentOperand = "0";
    let isPositive = true;
    clearMemory();

    Getting the functionality buttons and assigning functions
    const btnClear = document.querySelector("#clear");
    btnClear.onclick = clearMemory;

    const btnBack = document.querySelector("#backspace");
    btnBack.onclick = eraseLast;

    const btnChangeSign = document.querySelector("#negative");
    btnChangeSign.addEventListener("click", e => {
        if (currentOperand == "0") {
            return;
        }
        currentOperand = changeSign(isPositive, currentOperand).toString();
        screenText.textContent = `${currentOperand}`;
    });

    getOperand();

    const btnOperators = document.getElementsByName("operator");
    
    for(let i = 0; i < btnOperators.length; i++) {
        btnOperators[i].addEventListener("click", e => { 
            currentOperand += btnOperators[i].value;
            screenText.textContent = `${currentOperand}`;
        });
    }
    function getOperand() {
        
        const btnNumbers = document.getElementsByName("operand");
    
        for(let i = 0; i < btnNumbers.length; i++) {
            btnNumbers[i].addEventListener("click", e => {
                if(currentOperand == "0") {
                    if(btnNumbers[i].value == "0") {
                        return;
                    } else if(btnNumbers[i].value != ".") {
                        currentOperand = btnNumbers[i].value;
                        screenText.textContent = `${currentOperand}`;
                        return;
                    }
                } else if (btnNumbers[i].value == "." && currentOperand.includes(".")) {
                    return;
                }

                currentOperand += btnNumbers[i].value;
                screenText.textContent = `${currentOperand}`;
            });
        }
    }

    function clearMemory() {
        lastOperand = "0";
        currentOperand = "0";
        screenText.textContent = currentOperand;  
    }

    function eraseLast() {
        console.log(typeof(currentOperand));

        let operandArray = Array.from(currentOperand);
        console.table(operandArray);
        operandArray.pop();
        console.table(operandArray);

        if(operandArray.length == 1 && operandArray[0] == "-") {
            operandArray = [];
            operandArray.push("0");
            isPositive = true;
        } else if (operandArray[0] == "0") {
            return;
        } else if(operandArray.length == 0) {
            operandArray.push("0");
        }

        currentOperand = operandArray.join("");
        screenText.textContent = currentOperand;  
    }

    function changeSign(curentSign, currentOperand) {

        if(curentSign) {
            isPositive = !isPositive;
            return -Math.abs(currentOperand);
        }
        isPositive = !isPositive;
        return Math.abs(currentOperand);
    }
}
*/
let isPowered = false;

let operandInMemory = null;
let operandInDisplay = null;
let operatorInDisplay = null;

const getButton = function() {
    switch (this.name) {
        case "function":
            triggerBtnFunction(this.value);
            break;
        case "operator":
            triggerBtnOperator(this.value);
            break;
        case "number":
            triggerBtnNumber(this.value);
            break;
        default:
            console.log("humm, that wasn't really supposed to happen...");
    }
};

const btnPower = document.querySelector("#power");
btnPower.addEventListener("click", e => {
    if(!isPowered) {
        powerOn();
        return;
    }
    powerOff();
});

function powerOn() {

    const ledPower = document.querySelector("#led-display");
    ledPower.style["background-color"] = "#ed4c6e";

    btnPower.textContent = "off";

    const buttons = document.getElementsByTagName("button");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", getButton);
    }

    operandInMemory = "0";
    operandInDisplay = "0";
    operatorInDisplay = "=";
    isPowered = true;
    updateDisplay();
    
}

function powerOff() {

    const ledPower = document.querySelector("#led-display");
    ledPower.style["background-color"] = "#592326";

    btnPower.textContent = "on";

    const buttons = document.getElementsByTagName("button");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", getButton);
    }

    isPowered = false;
    updateDisplay();
}

function operate(firstOperand, secondOperand, operator) {
    let operationResult = null;
    firstOperand =  Number(firstOperand);
    secondOperand =  Number(secondOperand);
    console.log(firstOperand, operator, secondOperand);

    switch(operator) {
        case "+":
            operandInDisplay = (firstOperand + secondOperand).toString();
            break;
        case "-":
            operandInDisplay = (firstOperand - secondOperand).toString();
            break;
        case "*":
            operandInDisplay = (firstOperand * secondOperand).toString();
            break;
        case "/":
            operandInDisplay = (firstOperand / secondOperand).toString();
            break;
        default:
    }

    operandInMemory = secondOperand.toString();
    updateDisplay();
}

function triggerBtnFunction(btnFunction) {
    console.log("Triggering button function", btnFunction);
    switch(btnFunction) {
        case "clear":
            console.log("Clear memory and screen");
            break;
        case "back":
            console.log("Erase last digit. If negative, erase digit and sign");
            break;
        case "gwv":
            console.log("Take user to Github or portfolio");
            break;
        default:
    }
}

function triggerBtnOperator(btnOperator) {
    switch(btnOperator) {
        case "%":
            break;
        case "+/-":
            operandInDisplay = (Number(operandInDisplay) * -1).toString();
            updateDisplay();
            break;
        case "=":
            operate(operandInMemory, operandInDisplay, operatorInDisplay);
            break;
        default:
            operatorInDisplay = btnOperator;
            operate(operandInMemory, operandInDisplay, operatorInDisplay);
            operandInMemory = operandInDisplay
            operandInDisplay = "0";
    }

}

function triggerBtnNumber(btnNumber) {
    if(operandInDisplay == "0") {
        if(btnNumber == "0") {
            updateDisplay();
            return;
        }else if(btnNumber != ".") {
            operandInDisplay = btnNumber;
            updateDisplay();
            return;
        }
    }else if(btnNumber == "." && operandInDisplay.includes(".")) {
        updateDisplay();
        return;
    }

    operandInDisplay += btnNumber;
    updateDisplay();
}

function updateDisplay() {
    const screenText = document.querySelector("#screen-text");

    if(!isPowered){
        screenText.textContent = "";
        return;
    }

    screenText.textContent = operandInDisplay;
}