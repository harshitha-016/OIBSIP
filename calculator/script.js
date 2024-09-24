const display = document.getElementById('display');
let currentValue = '';
let previousValue = '';
let operator = null;
let answer = 0;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');

        if (value === "=") {
            calculate();
        } else if (value === "C" || e.target.id === "clear") {
            clearDisplay();
        } else if (value === "+/-") {
            toggleSign();
        } else if (value === "√") {
            squareRoot();
        } else if (e.target.id === "del") {
            deleteLast();
        } else if (e.target.id === "ans") {
            useAnswer();
        } else {
            appendValue(value);
        }
    });
});

function appendValue(value) {
    if (display.textContent === "0") currentValue = '';
    currentValue += value;
    display.textContent = currentValue;
}

function calculate() {
    try {
        if (currentValue.includes('%')) {
            currentValue = currentValue.replace('%', '/100');
        }
        const result = eval(currentValue);
        display.textContent = result;
        answer = result;
        currentValue = result.toString();
    } catch (error) {
        display.textContent = "Error";
        currentValue = '';
    }
}

function clearDisplay() {
    currentValue = '';
    display.textContent = '0';
}

function toggleSign() {
    if (currentValue) {
        if (currentValue[0] === '-') {
            currentValue = currentValue.slice(1);
        } else {
            currentValue = '-' + currentValue;
        }
        display.textContent = currentValue;
    }
}

function squareRoot() {
    if (currentValue) {
        const result = Math.sqrt(parseFloat(currentValue));
        display.textContent = result;
        currentValue = result.toString();
    }
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    if (!currentValue) currentValue = '0';
    display.textContent = currentValue;
}

function useAnswer() {
    currentValue = answer.toString();
    display.textContent = currentValue;
}
