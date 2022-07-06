//Recives keypress action
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

//Calculate basic math operators
const calculate = function (n1, operator, n2) {
  let result = "";

  if (operator === "add") result = parseFloat(n1) + parseFloat(n2);
  if (operator === "substract") result = parseFloat(n1) - parseFloat(n2);
  if (operator === "multiply") result = parseFloat(n1) * parseFloat(n2);
  if (operator === "divide") result = parseFloat(n1) / parseFloat(n2);

  return result;
};

//Events for click bottons
keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    //Determine the type of key
    //Number key
    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }
    //Operator key
    if (
      action === "add" ||
      action === "substract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //Highlighted efect in operator bottons
      key.classList.add("is-depressed");
      //Add custom attribute
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }
    //Decimal key
    if (action === "decimal") {
      display.textContent = displayedNum + ".";
    }

    //clear key
    if (action === "clear") {
      console.log("clear key!");
    }

    //Calculate key
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
});
