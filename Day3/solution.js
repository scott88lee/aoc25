const { input } = require('./input');
const inputArray = input.split('\n');

function checkArr(arr, checklength) {
  // Base case: if checklength is 0 or less, return empty string
  if (checklength <= 0 || arr.length === 0) {
    return '';
  }
  // Base case: if remaining array is shorter than checklength, return the last checklength digits
  if (arr.length <= checklength) {
    return arr.join('');
  }
  const { maxNum, position } = getMaxNumber(arr, checklength);
  if (position + checklength >= arr.length) {
    return arr.slice(checklength * -1).join('');
  }
  return maxNum.toString() + checkArr(arr.slice(position+1), checklength-1);
}

function testIt() {
  const numArr = inputArray[99].split('').map(Number);
  const str = checkArr(numArr, 12);
  const ans = Number(str);
  console.log(`TESTIT-Answer: ${str}, Length: ${str.length}`);
  console.log(`TESTIT-Answer as Number: ${ans}`);
}
testIt();

function getMaxNumber(numberArr, checklength) {
  let maxNum = 0;
  let pointer = 0;
  let position = 0;
  for (const num of numberArr) {
    if (num > maxNum) {
      maxNum = num;
      position = pointer;
    }
    if (pointer + checklength == numberArr.length) {
      break;
    }
    pointer++;
  }
  return { maxNum, position };
}

function processInput(inputArray) {
  let total = 0;
  let kickStarter = 0;
  for (let input of inputArray) {
    let jolt = getJoltageNumber(input);
    total += jolt;

    // Part 2
    let ansString = checkArr(input.split('').map(Number), 12);
    kickStarter += Number(ansString);
  }
  return { total, kickStarter };
}

console.log(processInput(inputArray));

function getMaxNum(numArr) {
  let maxNum = 0;
  let index = 0;
  for (let num of numArr) {
    if (num > maxNum) {
      maxNum = num;
      index = numArr.indexOf(num);
    }
  }
  return { maxNum, index };
}

function getJoltageNumber(numStr) {
  let numArr = numStr.split('').map(Number);
  
  const { maxNum, index } = getMaxNum(numArr);

  // Split Arr into two Left and Right
  let leftArr = numArr.slice(0, index);
  let rightArr = numArr.slice(index + 1);
 
  const { maxNum: maxLeftNum } = getMaxNum(leftArr);
  const { maxNum: maxRightNum } = getMaxNum(rightArr);

  const num1 = maxNum * 10 + maxRightNum;
  const num2 = maxLeftNum * 10 + maxNum;
  
  if (index === numArr.length - 1) {
    return num2;
  }
  if (num1 > num2) {
    return num1;
  } else {
    return num2;
  }
}

