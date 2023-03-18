let selection;
const input = document.getElementById("input");
const replaceTable = document.getElementById("replaceTable");
const output = document.getElementById("output");
const reversedText = document.getElementById("reversedText");

input.addEventListener("mouseup", (event) => {
  const activeElement = document.activeElement;
  if (activeElement === input) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const word = input.value.substring(start, end).trim();
    if (word) {
      addRow(word);
    }
  }
});

function addRow(word = "") {
  const row = document.createElement("tr");
  const beforeInput = document.createElement("input");
  beforeInput.type = "text";
  beforeInput.classList.add("before");
  beforeInput.value = word;
  const afterInput = document.createElement("input");
  afterInput.type = "text";
  afterInput.classList.add("after");
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", deleteRow);
  const td1 = document.createElement("td");
  td1.appendChild(beforeInput);
  const td2 = document.createElement("td");
  td2.appendChild(afterInput);
  const td3 = document.createElement("td");
  td3.appendChild(deleteButton);
  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  replaceTable.appendChild(row);
  beforeInput.focus();

}

function deleteRow(event) {
  const row = event.target.closest("tr");
  row.parentNode.removeChild(row);
}

function replaceWord() {
  const replacementMap = createReplacementMap();
  let replacedText = input.value;
  for (const [before, after] of replacementMap) {
    const regex = new RegExp(before, "g");
    replacedText = replacedText.replace(regex, after);
  }
  output.value = replacedText;
  highlightText();
}

function createReplacementMap() {
  const replacementMap = new Map();
  const rows = replaceTable.querySelectorAll("tr");
  rows.forEach((row) => {
    const beforeInput = row.querySelector(".before");
    const afterInput = row.querySelector(".after");
    const beforeValue = beforeInput.value.trim();
    const afterValue = afterInput.value.trim();
    if (beforeValue && afterValue) {
      replacementMap.set(beforeValue, afterValue);
    }
  });
  return replacementMap;
}

function highlightText() {
  const highlightedText = document.getElementById("highlightedText");
  const inputText = input.value;
  const replacementMap = createReplacementMap();
  let highlightedHtml = inputText;
  for (const [before, after] of replacementMap) {
    const regex = new RegExp(before, "g");
    highlightedHtml = highlightedHtml.replace(regex, `<span class="highlight">${before}</span>`);
  }
  highlightedText.innerHTML = highlightedHtml;
}

function clearSelection() {
  const highlightedText = document.getElementById("highlightedText");
  highlightedText.innerHTML = input.value;
}

function selectAll() {
  output.select();
  document.execCommand("copy");
}

function reverseTransform() {
  const replacementMap = createReplacementMap();
  let reversedTextValue = output.value;
  for (const [before, after] of replacementMap) {
    const regex = new RegExp(after, "g");
    reversedTextValue = reversedTextValue.replace(regex, before);
  }
  reversedText.value = reversedTextValue;
}
