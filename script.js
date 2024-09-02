// Variables to store the current input and the previous result
let currentInput = '';
let previousResult = '';

// Elements to display input and result
const inputDisplay = document.getElementById('inputDisplay');
const resultDisplay = document.getElementById('resultDisplay');

// Function to update the display
function updateDisplay() {
  inputDisplay.textContent = currentInput;
}

// Function to handle button clicks
function handleButtonClick(value) {
  // Handle different button types
  switch (value) {
    case 'C': // Clear
      currentInput = '';
      previousResult = '';
      resultDisplay.textContent = '';
      break;
    case '=': // Equals
      try {
        previousResult = eval(currentInput); // Evaluate the input
        resultDisplay.textContent = previousResult; // Display the result
        currentInput = ''; // Clear the current input
      } catch {
        resultDisplay.textContent = 'Error'; // Display error for invalid input
      }
      break;
    case '()': // Parentheses
      currentInput += '(';
      break;
    case '+/-': // Negate
      currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
      break;
    default: // Other inputs (numbers, operators)
      currentInput += value;
      break;
  }
  updateDisplay();
}

// Add event listeners to all buttons
document.querySelectorAll('#inputBtns button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim(); // Get the button text
    handleButtonClick(value); // Pass the value to the handler
  });
});
