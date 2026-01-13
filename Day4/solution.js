const { input } = require('./input');
const inputArray = input.split('\n');
const grid = inputArray.map(row => row.split(''));

console.log(grid);

for (const row = 0; row < grid.length; row++) {
  for (const col = 0; col < grid[row].length; col++) {
    const coordinates = getAdjacentCoordinates(row, col)

    const validSet = coordinates.map( (coordinate) => {
      const [row, col] = coordinate;
      //

    })

    }

    if (grid[row][col] === '@') {
      // get adjacent positions
      console.log(`${row}, ${col}`);
      break;
    }
  }
}

function getAdjacentCoordinates(row, col) {
  return [
    [row - 1, col -1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1]
  ]
}