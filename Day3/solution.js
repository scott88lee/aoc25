const { input } = require('./input');
const inputArray = input.split('\n');

const numStr = inputArray[0];
const numArr = numStr.split('').map(Number);

console.log(numStr);

function getMega(numArr, strLen) {
  const { maxNum, index } = getMaxNum(numArr);
  console.log(`String length: ${numArr.length}, Max Num: ${maxNum} Index: ${index}`);
  
  const tailLen = (numArr.length - index)
  console.log(tailLen);

  if (tailLen == strLen) return numArr.slice(index)
}

getMega(numArr, 12);

function processInput(inputArray) {
  let total = 0;
  for (let input of inputArray) {
    let jolt = getJoltageNumber(input);
    total += jolt;
  }
  return total;
}

//console.log(processInput(inputArray));

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

