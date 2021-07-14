let isOn = false;

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
    screenText.textContent = "_"
    isOn = true;

}