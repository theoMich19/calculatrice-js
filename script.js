function press(val) {
  let result = document.getElementById("result");
  let history = document.getElementById("history");
  result.classList.remove("error");

  if (val === "=") {
    try {
      let expression = result.value;
      if (expression.trim() === "") {
        return;
      }
      let answer = eval(expression);
      result.value = answer;

      let historyEntry = document.createElement("div");
      historyEntry.classList.add("history-entry");
      let expressionSpan = document.createElement("span");
      expressionSpan.classList.add("expression");
      expressionSpan.textContent = expression + " = ";
      historyEntry.appendChild(expressionSpan);
      historyEntry.appendChild(document.createTextNode(answer));
      history.insertBefore(historyEntry, history.firstChild);
    } catch (e) {
      result.classList.add("error");
    }
  } else if (val === "C") {
    result.value = "";
    result.classList.remove("error");
  } else {
    result.value += val;
  }
}

document
  .getElementById("toggleDarkMode")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      this.textContent = "Mode clair";
    } else {
      this.textContent = "Mode sombre";
    }
  });

document.addEventListener("keydown", function (event) {
  const key = event.key;
  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "Enter",
    "Backspace",
    "c",
    "C",
  ];
  if (allowedKeys.includes(key)) {
    event.preventDefault();
    if (key === "Enter") {
      press("=");
    } else if (key === "Backspace") {
      let result = document.getElementById("result");
      result.value = result.value.slice(0, -1);
      if (result.value === "") {
        result.classList.remove("error");
      }
    } else if (key === "C" || key === "c") {
      let result = document.getElementById("result");
      result.value = "";
      result.classList.remove("error");
    } else {
      press(key);
    }
  }
});
