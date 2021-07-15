let isOn = false;
let currentDisplay = "";

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
    
    /*Inicializing the calculator*/
    isOn = true;
    ledPower.style["background-color"] = "#ed4c6e";
    btnOnOff.textContent = "off";
    screenText.textContent = "_";         
    let lastOperand = "0";
    let currentOperand = "0";
    let isPositive = true;
    clearMemory();

    /*Getting the functionality buttons and assigning functions*/
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