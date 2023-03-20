const btnsContainer = document.querySelector('.btns-container');
let screen = document.querySelector('.screen');
let screenText = '';
let previousOperator = null;
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
        case '.':
            if (screenText.includes('.')) {
                return;
            }
            screenText += symbol;
            renderScreen();
            break;
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
            previousOperator = null;
            runningTotal = 0;
            screenText = '';
            renderScreen();
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            if (screenText === '') {
                return;
            }
            handleMath(symbol);
            break;
        case '=':
            if (!previousOperator || screenText === '') {
                return;
            }
            const intScreenText = parseFloat(screenText);
            operate(intScreenText);
            screenText = runningTotal.toString();
            renderScreen();
            previousOperator = null;
            break;
    }
}

function handleNumber(num) {
    screenText += num;
    renderScreen();
}

function handleMath(operator) {
    const intScreenText = parseFloat(screenText);
    if (!previousOperator) {
        runningTotal = intScreenText;
    }
    else {
        operate(intScreenText);
    }
    previousOperator = operator;
    screenText = runningTotal.toString();
    renderScreen();
    screenText = ''
}

function operate(intScreenText) {
    switch(previousOperator) {
        case '÷':
            runningTotal /= intScreenText;
            break;
        case '×':
            runningTotal *= intScreenText;
            break;
        case '−':
            runningTotal -= intScreenText;
            break;
        case '+':
            runningTotal += intScreenText;
            break;
    }
    runningTotal = Math.round(runningTotal * 10000000000) / 10000000000;
}

function renderScreen() {
    screen.innerText = screenText;
}

