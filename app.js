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

let operandOne = null;
let operator = null;
let operandTwo = null;
let numberOnDisplay = null;

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

    numberOnDisplay = "0";
    operator = null;
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
    operandOne = null;
    operator = null;
    operandTwo = null;
    numberOnDisplay = null;
    updateDisplay();
}

function operate(firstOperand, secondOperand, operatorInUse) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    let result;

    if(secondOperand == "0" && operatorInUse == "/") {
        const screenText = document.querySelector("#screen-text");
        screenText.textContent = "Sure, buddy...";
        alert("Haha, very funny!..");

        result = 0;
        triggerBtnFunction("clear");
        return result;
    }

    switch(operatorInUse) {
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        case "/":
            result = firstOperand / secondOperand;
            break;
        default:
    }

    operandOne = null;
    operandTwo = null;
    operator = null;
    return result;
}

function triggerBtnOperator(btnOperator) {

    switch(btnOperator) {
        case "%":
            console.log(operandOne, operator, operandTwo,  numberOnDisplay);
            if(operandOne == null) {
                return;
            } else {
                if(operator == null) {
                    return;
                } else {
                    operandTwo = (numberOnDisplay / 100) * operandOne;
                    numberOnDisplay = (operate(operandOne, operandTwo, operator)).toString();
                    updateDisplay();
                    operandOne = numberOnDisplay;
                    numberOnDisplay = "0";
                }
            }
            break;
        case "+/-":
            numberOnDisplay = (Number(numberOnDisplay) * -1).toString();
            updateDisplay();
            break;
        case "=":
            if(operandOne == null) {
                return;
            } else {
                if(operator == null){
                    return;
                } else {
                    operandTwo = numberOnDisplay;
                    numberOnDisplay = (operate(operandOne, operandTwo, operator)).toString();
                    updateDisplay();
                    operandOne = numberOnDisplay;
                    numberOnDisplay = "0";
                }
            }
            break;
        default:
            if(operandOne == null) {
                if(numberOnDisplay == "0") {
                    return;
                } else {
                    operandOne = numberOnDisplay;
                    numberOnDisplay = "0";
                    operator = btnOperator;
                }
            } else {
                if(operator == null) {
                    operator = btnOperator;
                    return;
                } else {
                    operandTwo = numberOnDisplay;
                    numberOnDisplay = (operate(operandOne, operandTwo, operator)).toString();
                    updateDisplay();
                    operandOne = numberOnDisplay;
                    numberOnDisplay = "0";
                    operator = btnOperator;
                }
            }
    }

}

function triggerBtnNumber(btnNumber) {

    if((Array.from(numberOnDisplay)).length == 10) {
        return;
    } else {
        if(numberOnDisplay == "0") {
            if(btnNumber == "0") {
                updateDisplay();
                return;
            } else if(btnNumber != ".") {
                numberOnDisplay = btnNumber;
                updateDisplay();
                return;
            }
        }
        
        if(btnNumber == "." && numberOnDisplay.includes(".")) {
            updateDisplay();
            return;
        } else {   
            numberOnDisplay += btnNumber;
            updateDisplay();
        }
    }
}


function triggerBtnFunction(btnFunction) {
    switch(btnFunction) {
        case "clear":
            operandOne = null;
            operator = null;
            operandTwo = null;
            numberOnDisplay = "0";
            updateDisplay();
            break;
        case "back":
            let displayArray = Array.from(numberOnDisplay);

            displayArray.pop();
    
            if(displayArray.length == 1 && displayArray[0] == "-") {
                displayArray = [];
                displayArray.push("0");
                isPositive = true;
            } else if (displayArray[0] == "0") {
                return;
            } else if(displayArray.length == 0) {
                displayArray.push("0");
            }
    
            numberOnDisplay = displayArray.join("");
            updateDisplay();
            break;
        case "gwv":
            window.location.href = "https://github.com/gvituri";
            break;
        default:
    }
}

function updateDisplay() {
    const screenText = document.querySelector("#screen-text");

    if(!isPowered){
        screenText.textContent = "";
        return;
    } else {
        screenText.textContent = numberOnDisplay;
    }
}