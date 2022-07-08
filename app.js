//Recives keypress action
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

//Calculate basic math operators
const calculate = function (n1, operator, n2) {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "substract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

//check if the key is a operator or number
const getKeyType = function (key) {
  const { action } = key.dataset;

  //Number key
  if (!action) return "number";

  //Operator key
  if (
    action === "add" ||
    action === "substract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";
  return action;
};

const createResult = function (key, displayedNum, state) {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } = state;

  //Do if you click a number botton
  if (keyType === "number") {
    return displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
      ? keyContent
      : displayedNum + keyContent;
  }

  //Do if you click a decimal botton
  if (keyType === "decimal") {
    if (!displayedNum.includes(".")) return displayedNum + ".";
    if (previousKeyType === "operator" || previousKeyType === "calculate")
      return "0.";
    return displayedNum;
  }

  //Do if you click a operator botton
  if (keyType === "operator") {
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  //Do if you click a clear botton
  if (keyType === "clear") return 0;

  //Do if you click a equal botton
  if (keyType === "calculate") {
    return firstValue
      ? previousKeyType === "calculate"
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const updateCalculatorState = function (
  key,
  calculator,
  calculatedValue,
  displayedNum
) {
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } =
    calculator.dataset;
  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === "clear" && key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";
  }
};

const updateVisualState = function (key, calculator) {
  const keyType = getKeyType(key);

  Array.from(key.parentNode.children).forEach((k) =>
    k.classList.remove("is-depressed")
  );

  if (keyType === "operator") key.classList.add("is-depressed");

  if (keyType === "clear" && key.textContent !== "AC") key.textContent = "AC";

  if (keyType !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "CE";
  }
};

//Events for click bottons
keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const key = e.target;
  const displayedNum = display.textContent;
  const resultString = createResult(key, displayedNum, calculator.dataset);

  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});
