const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const clearCurrentBtn = document.querySelector('.clearCurrent');

const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}
function addDecimal() {
  //if no oeprator pressed, don't add decimal
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    //If no decimal, add one
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}
//ready for next value, store operator
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation.toLocaleString(undefined, {
      maximmumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}
//reset display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}
// reset current
function resetCurrent() {
  calculatorDisplay.textContent = '0';
  awaitingNextValue = true;
}
//Adding event listeners for numbers, operators, decimal buttons
inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});
//event listener for resetbtn
clearBtn.addEventListener('click', () => resetAll());
clearCurrentBtn.addEventListener('click', () => resetCurrent());
//reset current input using backspace
document.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace') {
    resetCurrent();
  }
});
