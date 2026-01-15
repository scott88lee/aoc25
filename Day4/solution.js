// const { input } = require('./input');
const { input } = require('./test');
const inputArray = input.split('\n');
const grid = inputArray.map(row => row.split(''));

let runningCount = 0;
paperOperation(grid);
console.log(runningCount)
 
function paperOperation(grid) {
  const removeablePositions = [];
  let operationCount = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '.') { continue; }

      const coordinates = getAdjacentCoordinates(row, col)
      const validSet = coordinates.filter((coordinate) => {
        const [row, col] = coordinate;
        if (
          row < 0 ||
          row >= grid.length ||
          col < 0 ||
          col >= grid[row].length
        ) { return false }
        return [row, col]
      })

      let occupiedCount = 0;
      for (const coordinate of validSet) {
        const [row, col] = coordinate;
        if (grid[row][col] === '@') {
          occupiedCount++;
        }
      }
      if (occupiedCount < 4) {
        removeablePositions.push([row, col])
        runningCount++;
        operationCount++;
      }
    }
  }
  removePositions(grid, removeablePositions)

  if (operationCount == 0) {
    return;
  } else {
    paperOperation(grid)
  }
}

function removePositions(grid, removeablePositions) {
  for (const position of removeablePositions) {
    const [row, col] = position;
    grid[row][col] = '.';
  }
}


function printGrid(grid) {
  console.log("Count: ", count)
  console.log("------------------------------------")
  for (const row of grid) {
    console.log(row.join(''));
  }
  console.log('------------------------------------');
}

function getAdjacentCoordinates(row, col) {
  return [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1]
  ]
}