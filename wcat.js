#!/usr/bin/env node
const fs = require('fs');

// input
const inputArr = process.argv.slice(2);

// identify options
const optionsArr = [];
const filesArr = [];
for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);
  if (firstChar === '-') {
    optionsArr.push(inputArr[i]);
  } else {
    filesArr.push(inputArr[i]);
  }
}

// edge case -> check options
let areBothPresent = optionsArr.includes('-b') && optionsArr.includes('-n');
if (areBothPresent === true) {
  console.log('either enter -n or -b option');
  return;
}

// edge cse -> check if file exists
for (let i = 0; i < filesArr.length; i++) {
  let isPresent = fs.existsSync(filesArr[i]);
  if (isPresent === false) {
    console.log('file ' + filesArr[i] + ' is not present');
    return;
  }
}

// read file(s)
let content = '';
for (let i = 0; i < filesArr.length; i++) {
  let bufferContent = fs.readFileSync(filesArr[i]);
  content += bufferContent + '\r\n';
}

let contentArr = content.split('\r\n');
// -s
const isSPresent = optionsArr.includes('-s');
if (isSPresent === true) {
  for (let i = 1; i < contentArr.length; i++) {
    if (contentArr[i] === '' && contentArr[i - 1] === '') {
      contentArr[i] = null;
    } else if (contentArr[i] === '' && contentArr[i - 1] === null) {
      contentArr[i] = null;
    }
  }
  let tempArr = [];
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
      tempArr.push(contentArr[i]);
    }
  }
  contentArr = tempArr;
}
// console.log(contentArr.join('\n'));

// -n
let isNPresent = optionsArr.includes('-n');
if (isNPresent === true) {
  for (let i = 0; i < contentArr.length; i++) {
    contentArr[i] = i + 1 + ' ' + contentArr[i];
  }
}
// console.log(contentArr.join('\n'));

// -b
let isBPresent = optionsArr.includes('-b');
if (isBPresent === true) {
  let counter = 1;
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != '') {
      contentArr[i] = counter + ' ' + contentArr[i];
      counter++;
    }
  }
}
console.log(contentArr.join('\n'));
