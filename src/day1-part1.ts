import * as fs from "fs";

// Read input file
const input = fs.readFileSync("src/day1-input.txt", "utf8");

// Parse input into array of numbers
const depths = input.split("\n").map(Number);

let largerDepthsCount = 0;
let previousDepth = undefined;

for (const depth of depths) {
  if (previousDepth && depth > previousDepth) {
    largerDepthsCount++;
  }
  previousDepth = depth;
}

console.log("Larger depths count:", largerDepthsCount);
