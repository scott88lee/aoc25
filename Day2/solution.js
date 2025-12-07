const { input } = require('./input');
const inputArray = input.split(',')

function isPattern(str, length) {
	const pattern = str.slice(0, length);

	for (let pos = length; pos < str.length; pos += length) {
		if (str.slice(pos, pos + length) !== pattern) {
			return false;
		}
	}
	return true;
}


function getFactors(number) {
	let factors = [];
	for (let i = 1; i <= number; i++) {
		if (number % i === 0) {
			factors.push(i);
		}
	}
	factors.pop();
	return factors;
}

function checkValidity(number) {
	const numberString = number.toString();
	let factors = getFactors(numberString.length);

	for (let stringLength of factors) {
		if (isPattern(numberString, stringLength)) {
			console.log("Pattern found", number);
			return false;
		}
	}
	return true;
}

let sum = 0;
for (let range of inputArray) {
	const [a, b] = range.split('-');
	const start = parseInt(a);
	const end = parseInt(b);

	for (let number = start; number <= end; number++) {
		const validId = checkValidity(number);
		if (!validId) {
			sum += number;
		}
	}
}

console.log("Sum", sum);