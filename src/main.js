'use strict';

const fileInput = document.querySelector('.file-input-js');
const output = document.querySelector('.output-js');
const finderInput = document.querySelector('.finder-input-js');
const findBtn = document.querySelector('.find-btn-js');
const editBtn = document.querySelector('.edit-btn-js');
const editInput = document.querySelector('.edit-input-js');

findBtn.addEventListener('click', () => {
  const pattern = finderInput.value;
  const outputText = output.value;
  let words = textToArray(outputText);
  let matches = matchWordsWithPattern(words, pattern);
  // ! Probably, it's a weak code, it would be improved in the future.
  editBtn.addEventListener('click', function editBtnCallback() {
    editBtnHandler(matches, words);
    editBtn.removeEventListener('click', editBtnCallback);
  });
});

function editBtnHandler(matches, words) {
  const editInputvalue = editInput.value;
  const outputText = words.join(" ");
  const regex = new RegExp(editInputvalue, "g");
  outputText.replace()

  if (!matches) {
    matches.forEach();
  }
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
    output.value = text;
  } else {
    console.log('Wrong file type, please provide a text file.');
  }
});

// Converts the text to an array.
function textToArray(text) {
  return text.split(' '); // ! Can be changed.
}

// Matches the finderInput value (pattern) with an array of words (from the textarea), and returns a new array of object that includes matched words, and their indexes.
// ! This function could be removed in the future.
function matchWordsWithPattern(words, pattern) {
  const regex = new RegExp(pattern, 'g');
  let matches = [];
  for (let [index, word] of Object.entries(words.flat())) {
    if (regex.test(word)) matches.push({ word: word, index: index });
  }
  return matches;
}
