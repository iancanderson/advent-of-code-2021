import * as fs from "fs";

class DiagnosticCode {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  char(i: number): string {
    return this.content.charAt(i);
  }
}

enum Rating {
  OxygenGenerator,
  CarbonDioxideScrubber,
}

function filterCodes(
  codes: DiagnosticCode[],
  digit: number,
  rating: Rating
): DiagnosticCode[] {
  // Split numbers into two arrays, based on the first character
  const zeroCodes = [];
  const oneCodes = [];

  for (const code of codes) {
    if (code.char(digit) === "0") {
      zeroCodes.push(code);
    } else {
      oneCodes.push(code);
    }
  }

  if (rating === Rating.OxygenGenerator) {
    if (zeroCodes.length > oneCodes.length) {
      return zeroCodes;
    } else {
      return oneCodes;
    }
  } else {
    if (zeroCodes.length <= oneCodes.length) {
      return zeroCodes;
    } else {
      return oneCodes;
    }
  }
}

// Read input file
const input = fs.readFileSync("src/day3-input.txt", "utf8");
const codes: DiagnosticCode[] = input
  .split("\n")
  .map((line) => new DiagnosticCode(line));

const codeLength = codes[0].content.length;
let oxygenCandidates = codes.slice();
let carbonDioxideCandidates = codes.slice();

// Loop over digits
for (let digit = 0; digit < codeLength; digit++) {
  if (oxygenCandidates.length > 1) {
    oxygenCandidates = filterCodes(
      oxygenCandidates,
      digit,
      Rating.OxygenGenerator
    );
  }
  if (carbonDioxideCandidates.length > 1) {
    carbonDioxideCandidates = filterCodes(
      carbonDioxideCandidates,
      digit,
      Rating.CarbonDioxideScrubber
    );
  }
}

const oxygenCode = oxygenCandidates[0];
const carbonDioxideCode = carbonDioxideCandidates[0];

console.log({
  oxygenCode: oxygenCode.content,
  carbonDioxideCode: carbonDioxideCode.content,
  result:
    binaryStringToInt(oxygenCode.content) *
    binaryStringToInt(carbonDioxideCode.content),
});

function binaryStringToInt(binaryString: string): number {
  return parseInt(binaryString, 2);
}
