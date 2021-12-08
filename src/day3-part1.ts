import * as fs from "fs";

// Read input file
const input = fs.readFileSync("src/day3-input.txt", "utf8");

const lines: string[] = input.split("\n");

// Calculate a sum for each column of characters
const sums: number[] = [];
let digitLength = 0;

lines.forEach((line) => {
  let i = 0;
  for (const char of line) {
    sums[i] ||= 0;
    // Increment sum if char is a 1
    if (char == "1") {
      sums[i]++;
    }
    i++;
  }
  digitLength = i;
});

function gammaRate(sums: number[]): number {
  let binaryStr: string = sums.reduce((acc, sum) => acc + gammaDigit(sum), "");
  console.log({ binaryStr });
  return parseInt(binaryStr, 2);
}

function gammaDigit(sum: number): "0" | "1" {
  console.log({ sum, linesLen: lines.length });
  if (sum > lines.length / 2) {
    return "1";
  } else {
    return "0";
  }
}

// Epsilon is bitwise NOT the gamma rate
function epsilonRate(gammaRate: number): number {
  const digitLength = gammaRate;

  return parseInt(
    gammaRate
      .toString(2)
      .split("")
      .map((char) => (char == "1" ? "0" : "1"))
      .join("")
      .slice(-digitLength),
    2
  );
}

console.log({ gammaRate: gammaRate(sums) });
console.log({ epsilonRate: epsilonRate(gammaRate(sums)) });
console.log({
  powerConsumption: gammaRate(sums) * epsilonRate(gammaRate(sums)),
});
