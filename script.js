// Get the calculator display element
const display = document.getElementById("solution");

// Get all the calculator buttons
const buttons = document.querySelectorAll("button");

// Add click event listeners to all the buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the clicked button's value
    let buttonValue = button.textContent;

    // Handle different button values
    switch (buttonValue) {
      case "C":
        // Clear the display
        display.value = "";
        break;
      case "=":
        // Evaluate and display the result
        try {
          const result = eval(display.value.replace(/x/g, "*"));
          display.value = result;
          saveToHistory(display.value);
        } catch (error) {
          display.value = "Error";
        }
        break;
      default:
        // Append the button value to the display
        display.value += buttonValue;
        break;
    }
  });
});

// Handle the "History" button click event
const historyButton = document.getElementById("histButton");
historyButton.addEventListener("click", () => {
  display.value = getHistory();
});

// Save the calculation result to history
function saveToHistory(result) {
  const history = localStorage.getItem("calculatorHistory");
  if (history) {
    const updatedHistory = JSON.parse(history);
    updatedHistory.push(result);
    localStorage.setItem("calculatorHistory", JSON.stringify(updatedHistory));
  } else {
    localStorage.setItem("calculatorHistory", JSON.stringify([result]));
  }
}

// Retrieve the calculation history
function getHistory() {
  const history = localStorage.getItem("calculatorHistory");
  if (history) {
    return JSON.parse(history).join("\n");
  } else {
    return "No history available";
  }
}
