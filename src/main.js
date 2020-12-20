'use strict';

const fileInput = document.querySelector('.file-input-js');
const output = document.querySelector('.output-js');
const findBtn = document.querySelector('.find-btn-js');
const finder = document.querySelector('.finder-js');

findBtn.addEventListener('click', () => {
  const pattern = finder.value;
  const outputText = output.value;
  matchWordsWithPattern(textToArray(outputText), pattern);
});

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

// Matches the finder pattern with an array of words and returns it.
function matchWordsWithPattern(words, pattern) {
  const regex = new RegExp(pattern, 'g');
  let matches = words.flat().filter((word) => {
    console.log(word);
    return regex.test(word);
  });
  console.log(matches);
}
