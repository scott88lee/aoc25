const { ids: idsArr, range: rangeArr } = require('./input');
const ids = idsArr.split('\n').map(Number)
const ranges = rangeArr.split('\n').map( range => range.split("-").map(Number))

function isWithinRange(num, range) {
  return num >= range[0] && num <= range[1]
}

function isFresh(id) {
  return ranges.some(range => isWithinRange(id, range))
}

// Part 1: 679
const freshnessCount = ids.filter(id => isFresh(id)).length
console.log("Freshness Count:", freshnessCount)

// Part 2: 
// Remove duplicates
const uniqueRanges = new Set(rangeArr.split('\n'))

// Sort ranges by start value (ascending) to enable efficient merging
// This ensures overlapping ranges are adjacent so we can merge them in a single pass
const sortedRanges = Array.from(uniqueRanges)
  .map(range => range.split('-').map(Number))
  .sort((a, b) => a[0] - b[0])  // Sort by start (ascending)


// Merge overlapping ranges by building result array directly
// Start with the first range, then merge or add subsequent ranges
const mergedRanges = [sortedRanges[0]]

for (let i = 1; i < sortedRanges.length; i++) {
  const [nextStart, nextEnd] = sortedRanges[i]
  const lastMerged = mergedRanges[mergedRanges.length - 1]
  const [, lastEnd] = lastMerged

  if (nextStart <= lastEnd) {
    // Overlapping or adjacent - merge by extending the last merged range
    lastMerged[1] = Math.max(lastEnd, nextEnd)
  } else {
    // No overlap - add as a new range
    mergedRanges.push([nextStart, nextEnd])
  }
}

console.log("Merged Ranges:", mergedRanges)

// Calculate sum: count all integers in each merged range
// Formula: for range [start, end], count = end - start + 1
let finalCount = 0
for (const range of mergedRanges) {
  const [start, end] = range
  finalCount += end - start + 1
}

console.log("Final Count:", finalCount)