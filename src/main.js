'use strict';

const fileInput = document.querySelector('.file-input-js');
const output = document.querySelector(".output-js");

function validateFile(file) {
  return file.type === 'text/plain';
}

async function convertFileToText(file) {
  let text = null;
  try {
    text = await file.text();
    console.log('File has been converted successfully. ');
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
  }
  else {
      console.log("Wrong file type, please provide a text file.")
  }
});
