const { ids: idsArr, range: rangeArr } = require('./input');
const ids = idsArr.split('\n').map(Number)
const ranges = rangeArr.split('\n').map( range => range.split("-").map(Number))

function isWithinRange(num, range) {
  return num >= range[0] && num <= range[1]
}

function isFresh(id) {
  return ranges.some(range => isWithinRange(id, range))
}

let freshnessCount = 0
for (const id of ids) {
  if (isFresh(id)) {
    freshnessCount++;
  }
}
// Part 1: 679
console.log("Freshness Count:", freshnessCount)

// Part 2: 

// Remove duplicates
const _arr1 = rangeArr.split('\n')
const uniqueRanges = new Set(_arr1)

const sortedRanges = Array.from(uniqueRanges).sort((a, b) => {
  const [aStart, aEnd] = a.split('-').map(Number)
  const [bStart, bEnd] = b.split('-').map(Number)
  
  if (aStart !== bStart) {
    return aStart - bStart
  }
  return bEnd - aEnd
}).map(range => range.split('-').map(Number))


const indexesToRemove = []
let pointer = 0

for (let index = 1; index < sortedRanges.length; index++) {
  const currentRange = sortedRanges[pointer]
  const [currentStart, currentEnd] = currentRange

  const nextRange = sortedRanges[index]
  const [nextStart, nextEnd] = nextRange

  if (nextStart > currentEnd) {
    pointer = index
    continue;
  }

  if (nextEnd <= currentEnd) {
    indexesToRemove.push(index) 
  } else {
    currentRange[1] = nextEnd
    indexesToRemove.push(index)
  }
}

console.log("Indexes to remove:", indexesToRemove)
// create new array with entries removed
const indexesToRemoveSet = new Set(indexesToRemove)
const newArr = []
for (let i = 0; i < sortedRanges.length; i++) {
  if (!indexesToRemoveSet.has(i)) {
    newArr.push(sortedRanges[i])
  }
}

console.log("New Array:", newArr)

let finalCount = 0
for (const range of newArr) {
  const [start, end] = range
  finalCount += end - start + 1
}

console.log("Final Count:", finalCount)