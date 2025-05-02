const buttons = document.querySelectorAll('#calcButton');
const calculationDisplay = document.getElementById('calculation');
const resultDisplay = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let resultDisplayed = false;

function calculate(a, b, operator) {
    a = new Decimal(a.replace(',', '.'));
    b = new Decimal(b.replace(',', '.'));
    let result;
    switch (operator) {
        case '+':
            result = a.plus(b);
            break;
        case '-':
            result = a.minus(b);
            break;
        case '*':
            result = a.times(b);
            break;
        case '/':
            result = a.div(b);
            break;
        case '%':
            result = a.times(b)/100;
        default:
            result = new Decimal(0);
    }
    return result.toString().replace('.', ',').replace(/(\.0+|(?<=\.\d*[1-9])0+)$/, '');
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            calculationDisplay.textContent = '';
            resultDisplay.textContent = '0';
            resultDisplayed = false;
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            resultDisplay.textContent = currentInput || '0';
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                const result = calculate(previousInput, currentInput, operator);
                calculationDisplay.textContent = `${previousInput} ${operator} ${currentInput} =`;
                resultDisplay.textContent = result;
                currentInput = result;
                previousInput = '';
                operator = '';
                resultDisplayed = true;
            }
        } else if (value === '%') {
            if (currentInput) {
                currentInput = new Decimal(currentInput.replace(',', '.')).div(100).toString();
                resultDisplay.textContent = currentInput.replace('.', ',');
            }
        } else if (['+', '-', 'x', '/'].includes(value)) {
            if (currentInput) {
                if (operator) { 
                    operator = value === 'x' ? '*' : value;
                    calculationDisplay.textContent = `${previousInput} ${value}`;
                } else {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value === 'x' ? '*' : value;
                    calculationDisplay.textContent = `${previousInput} ${value}`;
                }
            } else if (previousInput && operator) {
                operator = value === 'x' ? '*' : value;
                calculationDisplay.textContent = `${previousInput} ${value}`;
            }
        } else {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            resultDisplay.textContent = currentInput;
        }
    });
});




























