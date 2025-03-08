const buttons = document.querySelectorAll('#calcButton');
const calculationDisplay = document.getElementById('calculation');
const resultDisplay = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let resultDisplayed = false;

function calculate(a, b, operator) {
    a = new Decimal(a.replace(',', '.')); // Replacing (',', '.') if decimal numbers are written with a comma
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
            result = new Decimal(0); // If an invalid operator is used, the result defaults to 0
    }
    return result.toString().replace('.', ',').replace(/(\.0+|(?<=\.\d*[1-9])0+)$/, ''); // Converts Decimal result to a string using .toString(), and replaces . with ,
} // \.0+ → removes trailing .0 (e.g., 12.0 → 12). (?<=\.\d*[1-9])0+ → removes extra trailing zeros but keeps decimals (e.g., 12.5000 → 12.5)

buttons.forEach(button => { // looping through each button
    button.addEventListener('click', () => { // Adds an event listener to each button, that listens for a click event
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            calculationDisplay.textContent = '';
            resultDisplay.textContent = '0';
            resultDisplayed = false;
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1); // Removes the last character from currentInput using .slice(0, -1) method
            resultDisplay.textContent = currentInput || '0'; // If currentInput is empty, displays '0' instead
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                const result = calculate(previousInput, currentInput, operator); // Calls calculate(previousInput, currentInput, operator) to get the result
                calculationDisplay.textContent = `${previousInput} ${operator} ${currentInput} =`; // Updates the calculation display (calculationDisplay.textContent) with the full equation
                resultDisplay.textContent = result;
                currentInput = result;
                previousInput = ''; // Clears previousInput and the operator
                operator = '';
                resultDisplayed = true; // Sets resultDisplayed to true so new input starts fresh
            }
        } else if (value === '%') {
            if (currentInput) { // Here is a percentage convertion, so we only need currentInput
                currentInput = new Decimal(currentInput.replace(',', '.')).div(100).toString(); // Uses Decimal.js for precision and convert the result (a Decimal object) into a string
                resultDisplay.textContent = currentInput.replace('.', ',');
            }
        } else if (['+', '-', 'x', '/'].includes(value)) {
            if (currentInput) { // If the user already selected an operator, it updates the operator (+, -, *, /)
                if (operator) { // If an operator is already set, update it (with *)
                    operator = value === 'x' ? '*' : value; // If x is pressed, it's replaced with *
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
        } else { // If the input is not an operator, we assume it’s a number
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value; // If the user is still typing a number, append value to currentInput
            }
            resultDisplay.textContent = currentInput; // Update the calculator screen to show the current number being entered
        }
    });
});




























