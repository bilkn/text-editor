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
  // ! Probably, it's a weak code, it would be improved in the future.
  editBtn.addEventListener('click', function editBtnCallback() {
    editBtnHandler(pattern, outputText);
    editBtn.removeEventListener('click', editBtnCallback);
  });
});

function editBtnHandler(pattern, outputText) {
  if (pattern) {
  const editInputvalue = editInput.value;
  const regex = new RegExp(pattern, "g");
  const replacedOutputText = outputText.replace(regex, editInputvalue);
  console.log(replacedOutputText);
  replaceOutput(replacedOutputText);
  }
  else console.log("Pattern is empty!")
}

function replaceOutput (outputText) {
  output.value = outputText;
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

