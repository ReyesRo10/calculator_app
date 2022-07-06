//Recives keypress action
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

//Determine the type of key
keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }
    if (
      action === "add" ||
      action === "substract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //Highlighted efect in operator bottons
      key.classList.add("is-depressed");

      //Add custom attribute
    }
    if (action === "decimal") {
      display.textContent = displayedNum + ".";
    }
    if (action === "clear") {
      console.log("clear key!");
    }
    if (action === "calculate") {
      console.log("equal key!");
    }
  }
});
