'use strict';

const prevInputDisplay = document.querySelector('#prevInputDisplay');
const currentInputDisplay = document.querySelector('#currentInputDisplay');

const clearBtn = document.querySelector('#clearBtn');
const decimalBtn = document.querySelector('#decimalBtn');
const equalBtn = document.querySelector('#equalBtn');
const negativePositiveBtn = document.querySelector('#negativePositiveBtn');
const percentageBtn = document.querySelector('#percentage');
const backspaceBtn = document.querySelector('#backspaceBtn');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

let currentOperand = '';
let prevOperand = '';
let operator = '';
let shouldResetDisplay = false;

const updateDisplay = () => {
  if (operator) {
    prevInputDisplay.textContent = `${prevOperand} ${operator}`;
    currentInputDisplay.textContent = currentOperand || '0';
  } else {
    prevInputDisplay.textContent = '';
    currentInputDisplay.textContent = currentOperand || '0';
  }
};

const resetDisplay = () => {
  currentOperand = '';
  prevOperand = '';
  operator = '';
  shouldResetDisplay = false;
  updateDisplay();
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'Error' : a / b);

const operate = (operator, a, b) => {
  if (operator === '') return null;

  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) return null;

  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
};

const handleNumberInput = (number) => {
  if (shouldResetDisplay) {
    currentOperand = number;
    shouldResetDisplay = false;
  } else {
    currentOperand += number;
  }
  updateDisplay();
};

const handleOperatorInput = (newOperator) => {
  if (currentOperand === '' && prevOperand === '') return;

  if (currentOperand === '') {
    operator = newOperator;
  } else if (prevOperand !== '') {
    const result = operate(operator, Number(prevOperand), Number(currentOperand));
    if (result !== null) {
      currentOperand = result.toString();
      prevOperand = '';
    } else {
      currentOperand = 'Error';
    }
    operator = newOperator;
  } else {
    operator = newOperator;
    prevOperand = currentOperand;
    currentOperand = '';
  }
  shouldResetDisplay = true;
  updateDisplay();
};

const handleEqualsInput = () => {
  if (currentOperand === '' || prevOperand === '' || operator === '') return;

  const result = operate(operator, Number(prevOperand), Number(currentOperand));
  if (result !== null) {
    currentOperand = result.toString();
  } else {
    currentOperand = 'Error';
  }
  prevOperand = '';
  operator = '';
  shouldResetDisplay = true;
  updateDisplay();
};

const handleDecimalInput = () => {
  if (shouldResetDisplay) {
    currentOperand = '0.';
    shouldResetDisplay = false;
  } else if (!currentOperand.includes('.')) {
    currentOperand += currentOperand === '' ? '0.' : '.';
  }
  updateDisplay();
};

const handleNegativePositive = () => {
  if (currentOperand !== '' && currentOperand !== '0') {
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateDisplay();
  }
};

const handlePercentage = () => {
  if (currentOperand !== '' && currentOperand !== '0') {
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay();
  }
};

const handleBackspace = () => {
  if (currentOperand.length > 0) {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
  }
};

numbers.forEach((button) => {
  button.addEventListener('click', () => handleNumberInput(button.value));
});

operators.forEach((button) => {
  button.addEventListener('click', () => handleOperatorInput(button.value));
});

equalBtn.addEventListener('click', handleEqualsInput);
clearBtn.addEventListener('click', resetDisplay);
decimalBtn.addEventListener('click', handleDecimalInput);
negativePositiveBtn.addEventListener('click', handleNegativePositive);
percentageBtn.addEventListener('click', handlePercentage);
backspaceBtn.addEventListener('click', handleBackspace);

// Keyboard support
document.addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') handleNumberInput(event.key);
  if (event.key === '.') handleDecimalInput();
  if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') handleOperatorInput(event.key);
  if (event.key === 'Enter' || event.key === '=') handleEqualsInput();
  if (event.key === 'Escape') resetDisplay();
  if (event.key === '%') handlePercentage();
  if (event.key === 'Backspace') handleBackspace();
});