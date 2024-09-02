'use strict';

// input variables displayed on the inputDisplay
let currentInput = '';
let result = '';

const inputDisplay = document.querySelector('#inputDisplay');
const resultDisplay = document.querySelector('#resultDisplay');

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const divideBtn = document.querySelector('#divideBtn');
const clearBtn = document.querySelector('#clearBtn');

const updateDisplay = () => {
  inputDisplay.textContent = currentInput;
  resultDisplay.textContent = result;
}

const isOperator = () => {
  return ['+', '-', 'x', '/', '%'].includes(char);
}

const calculate = () => {
  const tokens = current.Input.match(/(\d+\.?\d*)|([+\-x/%])/g);
  if (!tokens) return;

  let stack = [];
  let currentOperator = null;

  for (let token of tokens) {
    if (isOperator(token)) {
      currentOperator = token;
    } else {
      const number = parseFloat(token);
      if (stack.length === 0) {
        stack.push(number);
      } else {
        const prevNumber = stack.pop();
        switch (currentOperator) {
          case '+':
            return stack.push(prevNumber + number);
          case '-':
            return stack.push(prevNumber - number);
          case '*':
            return stack.push(prevNumber * number);
          case '/':
            return stack.push(prevNumber / number);
          case '%':
            return stack.push(prevNumber % number);
        }
      }
    }
  }

}

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    let value = button.value;
    currentInput += value;
    updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    let operator = button.textContent;
    currentInput += operator;
    updateDisplay();
  });
});

divideBtn.addEventListener('click', () => {
  currentInput += '/';
});

clearBtn.addEventListener('click', () => {
  currentInput = '';
  updateDisplay();
})

// Now I need to do:
// 1- Calculations ? shall I present the resultDisplay from here?
// 2- Prevent operators from outputing beside each other, instead, replace each other