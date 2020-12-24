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
  const highlightedText = addHighlight(outputText,pattern);
  highlightOutput(highlightedText);
  // ! Probably it's a weak code, it would be improved in the future.
  replaceBtn.addEventListener('click', function replaceBtnCallback() {
    replaceBtnHandler(pattern, outputText);
    replaceBtn.removeEventListener('click', replaceBtnCallback);
  });
});

function replaceBtnHandler(pattern, outputText) {
  if (pattern) {
    const replaceInputValue = replaceInput.value;
    const regex = addPatternToRegex(pattern);
    const replacedOutputText = outputText.replace(regex, replaceInputValue);
    replaceOutput(replacedOutputText.replace(/\s\s/g, ' '));
  } else console.log('Pattern is empty!');
}

function highlightOutput (text) {
  output.innerHTML = text;
}

function replaceOutput(outputText) {
  output.textContent = outputText;
}

function validateFile(file) {
  return file.type === 'text/plain';
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

// Adds highligth to the matched characters.
function addHighlight(text, pattern) {
  const regex = addPatternToRegex(pattern);
  return text.replace(regex, `<em>${pattern}</em>`);
}
