let isOn = false;
let displayText = "";

let operation = {
    firstOperand: null,
    operator: null,
    secondOperand: null,
}

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
    
    ledPower.style["background-color"] = "#ed4c6e";
    btnOnOff.textContent = "off";
    screenText.textContent = "_";
    isOn = true;

    getOperand();

    const btnOperators = document.getElementsByName("operator");
    
    for(let i = 0; i < btnOperators.length; i++) {
        btnOperators[i].addEventListener("click", e => { 
            displayText += btnOperators[i].value;
            screenText.textContent = `${displayText}`;
        });
    }
    function getOperand() {
        
        const btnNumbers = document.getElementsByName("operand");
    
        for(let i = 0; i < btnNumbers.length; i++) {
            btnNumbers[i].addEventListener("click", e => {
                if(btnNumbers[i].value == "." && displayText.includes(".")) {
                    return;
                }
                displayText += btnNumbers[i].value;
                screenText.textContent = `${displayText}`;
            });
        }
    }
}