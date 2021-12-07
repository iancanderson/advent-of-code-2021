import * as fs from "fs";

function eachCons<T>(array: Array<T>, num: number): Array<Array<T>> {
  return Array.from({ length: array.length - num + 1 }, (_, i) =>
    array.slice(i, i + num)
  );
}

// Read input file
const input = fs.readFileSync("src/day1-input.txt", "utf8");

// Parse input into array of numbers
const depths = input.split("\n").map(Number);

let largerWindowsCount = 0;
let previousWindowSum = undefined;

const windowSums = eachCons(depths, 3).map((window) => {
  return window.reduce((a, b) => a + b);
});

for (const windowSum of windowSums) {
  if (previousWindowSum && windowSum > previousWindowSum) {
    largerWindowsCount++;
  }
  previousWindowSum = windowSum;
}

console.log("Larger windows count:", largerWindowsCount);
