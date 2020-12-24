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
  const words = textToArray(outputText);
  const matches = matchWordsWithPattern(words, pattern);
  console.log(matches);
  const highlightedCharacters = addHighlight(words, matches);
  console.log(highlightedCharacters);
  // ! Probably it's a weak code, it would be improved in the future.
  replaceBtn.addEventListener('click', function replaceBtnCallback() {
    replaceBtnHandler(pattern, outputText);
    replaceBtn.removeEventListener('click', replaceBtnCallback);
  });
});


function replaceBtnHandler(pattern, outputText) {
  if (pattern) {
    const replaceInputValue = replaceInput.value;
    const regex = new RegExp(pattern, 'g');
    const replacedOutputText = outputText.replace(regex, replaceInputValue);
    replaceOutput(replacedOutputText.replace(/\s\s/g, ' '));
  } else console.log('Pattern is empty!');
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

// Converts the text to an array.
function textToArray(text) {
  return text.split(' ').flat(); // ! Can be changed.
}

// Matches the finderInput value (pattern) with an array of words (from the textarea), and returns a new array of object that includes matched words, and their indexes.
// ! This function could be removed in the future.
function matchWordsWithPattern(words, pattern) {
  if (pattern !== "") {
    const regex = new RegExp(pattern, 'g');
    let matches = [];
    for (let [index, word] of Object.entries(words)) {
      if (regex.test(word)) matches.push({ word: word, index: index });
    }
    return matches;
  }
  return [];
}

// Adds highlighting to the matched characters.
function addHighlight (words, matches) {
  matches.forEach(({word, index}) => {
    words[index] = `<b>${word}</b>`;
  });
  return words;
}



