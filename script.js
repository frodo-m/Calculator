let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

// Select DOM elements (number buttons, operator buttons, etc.)
const clearBtn = document.querySelector('#clearBtn');
const equalBtun = document.querySelector('#equalBtn');
const decimalBtn = document.querySelector('decimalBtn');
const negativePositiveBtn = document.querySelector('negativePositiveBtn')
const numbers = document.querySelectorAll('number');
const operators = document.querySelectorAll('operator');
const prevOpisplay = document.querySelector('prevOperationDisplay');
const currentOpDisplay = document.querySelector('currentOperationDisplay');

numbers.forEach((button) => {
  button.addEventListener('click')
})

// Add event listeners:
//     Add keydown event listener to window
//     Add click event listeners to equals, clear, delete, and point buttons
//     Add click event listeners to all number buttons
//     Add click event listeners to all operator buttons

// Define function appendNumber(number):

//     If currentOperationScreen is '0' or shouldResetScreen is true:
//         Reset screen
//     Append number to currentOperationScreen

// Define function resetScreen():

//     Clear currentOperationScreen
//     Set shouldResetScreen to false

// Define function clear():

//     Reset currentOperationScreen to '0'
//     Clear lastOperationScreen
//     Reset firstOperand, secondOperand, and currentOperation

// Define function appendPoint():

//     If shouldResetScreen is true:
//         Reset screen
//     If currentOperationScreen is empty:
//         Set currentOperationScreen to '0'
//     If currentOperationScreen doesn't include '.':
//         Append '.' to currentOperationScreen

// Define function deleteNumber():
const deleteNumber = () => {
  currentOpDisplay.textContent = currentOpDisplay.textContent.toString().slice(0, -1);
}

//     Remove last character from currentOperationScreen

// Define function setOperation(operator):

//     If currentOperation is not null:
//         Evaluate current operation
//     Set firstOperand to currentOperationScreen value
//     Set currentOperation to operator
//     Update lastOperationScreen
//     Set shouldResetScreen to true

// Define function evaluate():

//     If currentOperation is null or shouldResetScreen is true:
//         Return
//     If dividing by zero:
//         Show alert and return
//     Set secondOperand to currentOperationScreen value
//     Calculate result using operate function
//     Round result
//     Update currentOperationScreen with result
//     Update lastOperationScreen with full operation
//     Reset currentOperation

// Define function roundResult(number):
//     Round number to 3 decimal places

// Define function handleKeyboardInput(event):
//     If key is number:
//         Append number
//     If key is '.':
//         Append point
//     If key is '=' or 'Enter':
//         Evaluate
//     If key is 'Backspace':
//         Delete number
//     If key is 'Escape':
//         Clear
//     If key is operator:
//         Set operation (convert operator if necessary)

// Define function convertOperator(keyboardOperator):
const convertOperator = (keyboardOperator) => {
  if (keyboardOperator === '+') return '+';
  if (keyboardOperator === '-') return '−';
  if (keyboardOperator === '*') return 'x';
  if (keyboardOperator === '/') return '÷';
}
//     Convert keyboard operators to display operators

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

// Define function operate(operator, a, b):
const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  };
};