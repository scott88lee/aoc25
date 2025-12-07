const { input } = require('./input');
const inputArray = input.split('\n')
// console.log("Input", input);

let position = 50; // Starting at the middle of the dial
let password = 0;

function runCommand(command) {
  const direction = command[0];
  let steps = parseInt(command.slice(1), 10);
  
  for (let i=0; i<steps; i++) {
    if (direction === 'L') position -= 1
    if (direction === 'R') position += 1
    if (position == -1) position = 99;
    if (position == 100) position = 0
    if (position == 0) password += 1; 
  }
}

for (let command of inputArray) {
  runCommand(command);
}

console.log(`Final Position: ${position}, Password: ${password}`);
