const { input } = require('./data/three');
const inputArray = input.split('\n');

function test() {
  const testInput = inputArray[0];
  const numArr = testInput.split('').map(Number);
  console.log('Test Input:', testInput);
  const { maxNum, index } = getMaxNum(numArr);
  console.log('Max Num:', maxNum, 'Index:', index);
  const jolt = getJoltageNumber(testInput);
  console.log('Joltage Number:', jolt);
}
test();

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

