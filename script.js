const btnsContainer = document.querySelector('.btns-container')
let screenText = '';
let screen = document.querySelector('.screen');
let lastOperator;
let num1;
let num2;
let runningTotal = 0;

btnsContainer.addEventListener('click', e => {
    determineBtnType(e.target.innerText);
})

function determineBtnType(btnText) {
    if (isNaN(parseInt(btnText))) {
        handleSymbol(btnText);
    }
    else {
        handleNumber(btnText);
    }
}

function handleSymbol(symbol) {
    switch(symbol) {
        case '←':
            if (screenText.length === 1) {
                screenText = ''
            }
            else {
                screenText = screenText.substring(0, screenText.length-1);
            }
            renderScreen();
            break;
        case 'C':
            screenText = '';
            renderScreen();
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            if (!num1) {
                num1 = parseInt(screenText);
                console.log(`num1 = ${num1}`);
            } else {
                num2 = parseInt(screenText);
                console.log(`num2 = ${num2}`)
            }
            if (num1 && num2) {
                operate(num1, num2, symbol);
            }
            screenText = '';
            lastOperator = symbol;
            break;
        case '=':
            if (!lastOperator) {
                return;
            }
            screenText = runningTotal.toString();
            renderScreen();
            reset();
            break;
    }
}

function handleNumber(num) {
    screenText += num;
    renderScreen();
}

function operate (num1, num2, lastOperator) {
    switch(lastOperator) {
        case '÷':
            runningTotal = num1 / num2;
            break;
        case '×':
            runningTotal = num1 * num2;
            break;
        case '−':
            runningTotal = num1 - num2;
            break;
        case '+':
            runningTotal = num1 + num2;
            break;
    }
    screenText = runningTotal.toString();
    renderScreen();
    num1 = runningTotal;
    console.log(`num1 = ${num1}`);
}

function reset() {
    num1 = null;
    num2 = null;
    runningTotal = 0;
}

function renderScreen() {
    screen.innerText = screenText;
}

