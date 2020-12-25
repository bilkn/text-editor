'use strict';

const fileInput = document.querySelector('.file-input-js');
const output = document.querySelector('.output-js');
const finderInput = document.querySelector('.finder-input-js');
const findBtn = document.querySelector('.find-btn-js');
const replaceBtn = document.querySelector('.replace-btn-js');
const replaceInput = document.querySelector('.replace-input-js');

findBtn.addEventListener('click', () => {
  const pattern = finderInput.value;
  const outputText = output.textContent;
  if (pattern) {
    const highlightedText = addHighlight(outputText, pattern);
    highlightOutput(highlightedText);
    const matchesCount = countMatches(outputText, pattern);
    matchesCount ? (replaceBtn.disabled = false) : (replaceBtn.disabled = true);
  } else {
    console.log('Pattern is empty!');
  }
});

replaceBtn.addEventListener('click', () => {
  const pattern = finderInput.value;
  pattern ? replaceBtnHandler(pattern) : console.log('Pattern is empty!');
});

function replaceBtnHandler(pattern) {
  replaceBtn.disabled = true;
  const outputText = output.textContent;
  const replaceInputValue = replaceInput.value;
  const regex = addPatternToRegex(pattern);
  const replacedOutputText = outputText.replace(regex, replaceInputValue);
  replaceOutput(replacedOutputText.replace(/\s\s/g, ' '));
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
