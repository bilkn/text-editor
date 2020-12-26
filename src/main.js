'use strict';

const fileInput = document.querySelector('.file-input-js');
const output = document.querySelector('.output-js');
const finderInput = document.querySelector('.finder-input-js');
const findBtn = document.querySelector('.find-btn-js');
const replaceBtn = document.querySelector('.replace-btn-js');
const replaceInput = document.querySelector('.replace-input-js');
const matchCountDisplay = document.querySelector('.match-count-js');
const downloadBtn = document.querySelector('.download-btn-js');

window.addEventListener('load', windowLoadEventHandler);
findBtn.addEventListener('click', findBtnHandler);
replaceBtn.addEventListener('click', replaceBtnHandler);
downloadBtn.addEventListener('click', downloadBtnHandler);

function windowLoadEventHandler() {
  output.textContent = localStorage.getItem('savedText') || '';
  setInterval(saveCurrentText, 30000); // Saves the current text to the local storage every 30 seconds.
}

function findBtnHandler() {
  const pattern = finderInput.value;
  const outputText = output.textContent;
  if (pattern) {
    const highlightedText = addHighlight(outputText, pattern);
    highlightOutput(highlightedText);
    const matchesCount = countMatches(outputText, pattern);
    updateMatchCountDisplay(matchesCount);
    matchesCount ? activateUI(replaceBtn) : disableUI(replaceBtn);
  } else {
    console.log('Pattern is empty!');
  }
}

function replaceBtnHandler() {
  const pattern = finderInput.value;
  if (pattern) {
    disableUI(replaceBtn);
    const outputText = output.textContent;
    const replaceInputValue = replaceInput.value;
    const regex = addPatternToRegex(pattern);
    const replacedOutputText = outputText.replace(regex, replaceInputValue);
    replaceOutput(replacedOutputText.replace(/\s\s/g, ' '));
    saveCurrentText();
    updateMatchCountDisplay(0);
  } else {
    console.log('Pattern is empty!');
  }
}

function downloadBtnHandler() {
  const outputText = output.textContent;
  let element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(outputText)
  );
  element.setAttribute('download', 'output.txt');
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function saveCurrentText() {
  localStorage.setItem('savedText', output.textContent);
}

function highlightOutput(text) {
  output.innerHTML = text;
}

function replaceOutput(outputText) {
  output.textContent = outputText;
}

function validateFile(file) {
  try {
    return file.type === 'text/plain';
  } catch (err) {
    console.log(err);
  }
}

async function convertFileToText(file) {
  let text = null;
  try {
    text = await file.text();
    console.log('File has been converted successfully.');
  } catch {
    console.log('Error, file could not be converted.');
  }
  return text;
}

fileInput.addEventListener('change', async () => {
  let file = null;
  try {
    file = await fileInput.files[0];
    console.log('File is uploaded successfully.');
  } catch (err) {
    console.log(err);
  }
  if (validateFile(file)) {
    const text = await convertFileToText(file);
    output.textContent = text;
  } else {
    console.log('Wrong file type, please provide a text file.');
  }
});

function addPatternToRegex(pattern) {
  return new RegExp(pattern, 'g');
}

// Adds highlight to the matched characters.
function addHighlight(text, pattern) {
  const regex = addPatternToRegex(pattern);
  return text.replace(regex, `<span class ="highlight">${pattern}</span>`);
}

// Counts the matched groups of characters.
function countMatches(text, pattern) {
  const regex = addPatternToRegex(pattern);
  try {
    return text.match(regex).length;
  } catch {
    return 0;
  }
}

function activateUI(ui) {
  ui.disabled = false;
  ui.classList.remove('not-allowed-cursor');
}

function disableUI(ui) {
  ui.disabled = true;
  ui.classList.add('not-allowed-cursor');
}

function updateMatchCountDisplay(count) {
  matchCountDisplay.textContent = `${count} matches found.`;
  matchCountDisplay.style.visibility = 'visible';
}
