//basic math operation functions

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

//Operate
function operate(operator, num1, num2) {
  if (operator === add) return add(num1, num2);
  if (operator === substract) return substract(num1, num2);
  if (operator === multiply) return multiply(num1, num2);
  if (operator === divide) return divide(num1, num2);
}

//Click Events

document.querySelector(".seven").addEventListener("click", function () {
  console.log(7);
  document.getElementByClassName("display").innerHtml = "Hello world";
});
