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
    clearMemory();

    /*Getting the functionality buttons and assigning functions*/
    const btnClear = document.querySelector("#clear");
    btnClear.onclick = clearMemory;

    const btnBack = document.querySelector("#backspace");
    btnBack.onclick = eraseLast;

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
                if(btnNumbers[i].value == "." && currentOperand.includes(".")) {
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
        if(currentOperand == "0") {
            return;
        }
        
        let operandArray = Array.from(currentOperand);
        operandArray.pop();
        console.table(operandArray);
        currentOperand = operandArray.join("");
        console.log(currentOperand);
        screenText.textContent = currentOperand;  
    }
}