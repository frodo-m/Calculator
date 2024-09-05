'use strict';

const prevInputDisplay = document.querySelector('#prevInputDisplay');
const currentInputDisplay = document.querySelector('#currentInputDisplay');

const clearBtn = document.querySelector('#clearBtn');
const decimalBtn = document.querySelector('#decimalBtn');
const equalBtn = document.querySelector('#equalBtn');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')

let currentOperand = '';
let prevOperand = '';
let operator = '';
let shouldResetDisplay = false;

const updateDisplay = () => {
  if (operator) {
    prevInputDisplay.textContent = `${prevOperand} ${operator}`;
    currentInputDisplay.textContent = currentOperand;
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

const divide = (a, b) => {
  if (b === 0) return 'Error';

  return b / a;
};

const operate = (operator, a, b) => {
  if (operator === '') return;

  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) return null;

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

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    const numberClicked = button.value;
    if (shouldResetDisplay) {
      currentOperand = numberClicked;
      shouldResetDisplay = false;
    } else {
      currentOperand += numberClicked;
    };
    updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentOperand && prevOperand && operator) {
      currentOperand = operate(operator, Number(currentOperand), Number(prevOperand)).toString();
      prevOperand = '';
    };
    operator = button.value;
    prevOperand = currentOperand;
    currentOperand = '';
    shouldResetDisplay = true;
    updateDisplay();
  });
});

equalBtn.addEventListener('click', () => {
  if (currentOperand && operator && prevOperand) {
    const result = operate(operator, Number(currentOperand), Number(prevOperand));
    prevInputDisplay.textContent = `${prevOperand} ${operator} ${currentOperand} =`;
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
});

clearBtn.addEventListener('click', resetDisplay);

decimalBtn.addEventListener('click', () => {
  if (!currentOperand.includes('.')) {
    currentOperand += '.';
    updateDisplay();
  };
});
