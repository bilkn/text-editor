'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fileInput = document.querySelector('.file-input-js');
var output = document.querySelector('.output-js');
var finderInput = document.querySelector('.finder-input-js');
var findBtn = document.querySelector('.find-btn-js');
var replaceBtn = document.querySelector('.replace-btn-js');
var replaceInput = document.querySelector('.replace-input-js');
var matchCountDisplay = document.querySelector('.match-count-js');
var downloadBtn = document.querySelector('.download-btn-js');
var copyBtn = document.querySelector('.copy-btn-js');
window.addEventListener('load', windowLoadEventHandler);
findBtn.addEventListener('click', findBtnHandler);
replaceBtn.addEventListener('click', replaceBtnHandler);
downloadBtn.addEventListener('click', function () {
  output.textContent ? downloadBtnHandler() : console.log('Text is empty!');
});
copyBtn.addEventListener('click', function () {
  output.textContent ? copyToClipboard() : console.log('Text is empty!');
});

function windowLoadEventHandler() {
  output.textContent = localStorage.getItem('savedText') || '';
  setInterval(saveCurrentText, 30000); // Saves the current output text to the local storage every 30 seconds.
} // Highlights the matched characters.


function findBtnHandler() {
  var pattern = finderInput.value;
  var outputText = output.textContent;

  if (pattern) {
    var highlightedText = addHighlight(outputText, pattern);
    highlightOutput(highlightedText);
    var matchesCount = countMatches(outputText, pattern);
    updateMatchCountDisplay(matchesCount);
    matchesCount ? activateUI(replaceBtn) : disableUI(replaceBtn);
  } else {
    console.log('Pattern is empty!');
  }
} // Replaces the output text according to the finder input value (pattern).


function replaceBtnHandler() {
  var pattern = finderInput.value;

  if (pattern) {
    disableUI(replaceBtn);
    var outputText = output.textContent;
    var replaceInputValue = replaceInput.value;
    var regex = addPatternToRegex(pattern);
    var replacedOutputText = outputText.replace(regex, replaceInputValue);
    replaceOutput(replacedOutputText.replace(/\s\s/g, ' '));
    saveCurrentText();
    updateMatchCountDisplay(0);
  } else {
    console.log('Pattern is empty!');
  }
} // Downloads the output text.


function downloadBtnHandler() {
  var outputText = output.textContent;
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputText));
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

function convertFileToText(_x) {
  return _convertFileToText.apply(this, arguments);
}

function _convertFileToText() {
  _convertFileToText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var text;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = null;
            _context.prev = 1;
            _context.next = 4;
            return file.text();

          case 4:
            text = _context.sent;
            console.log('File has been converted successfully.');
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log('Error, file could not be converted.');

          case 11:
            return _context.abrupt("return", text);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _convertFileToText.apply(this, arguments);
}

fileInput.addEventListener('change', fileInputHandler); // ! Divide this function to the parts.

function fileInputHandler() {
  return _fileInputHandler.apply(this, arguments);
}

function _fileInputHandler() {
  _fileInputHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var file, text;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            file = null;
            _context2.prev = 1;
            _context2.next = 4;
            return fileInput.files[0];

          case 4:
            file = _context2.sent;
            console.log('File is uploaded successfully.');
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 11:
            if (!validateFile(file)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 14;
            return convertFileToText(file);

          case 14:
            text = _context2.sent;
            output.textContent = text;
            _context2.next = 19;
            break;

          case 18:
            console.log('Wrong file type, please provide a text file.');

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _fileInputHandler.apply(this, arguments);
}

function addPatternToRegex(pattern) {
  return new RegExp(pattern, 'g');
} // Highlights the matched characters.


function addHighlight(text, pattern) {
  var regex = addPatternToRegex(pattern);
  return text.replace(regex, "<span class =\"highlight\">".concat(pattern, "</span>"));
} // Counts the matched groups of characters.


function countMatches(text, pattern) {
  var regex = addPatternToRegex(pattern);

  try {
    return text.match(regex).length;
  } catch (_unused) {
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
  matchCountDisplay.textContent = "".concat(count, " matches found.");
  matchCountDisplay.style.visibility = 'visible';
} // Copies output text to the clipboard.


function copyToClipboard() {
  var text = output.textContent;
  var elem = document.createElement('textarea');
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
  console.log('Text is copied.');
}