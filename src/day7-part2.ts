import * as fs from "fs";

const input = fs.readFileSync("src/day7-input.txt", "utf8");
console.log({ input });
let crabLocationStrings = input.split(",");

const crabLocations = crabLocationStrings.map(Number);
crabLocations.sort((a, b) => a - b);

console.log({
  crabLocationStrings,
  crabLocations,
  length: crabLocations.length,
});

const minCrabLocation = crabLocations[0];
const maxCrabLocation = crabLocations[crabLocations.length - 1];
console.log({ minCrabLocation, maxCrabLocation });

type Location = number;
type Fuel = number;

interface FuelByLocation {
  [location: Location]: Fuel;
}

function nthTriangle(num: number): number {
  return (num * (num + 1)) / 2;
}

function calculateFuel(targetLocation: Location): Fuel {
  return crabLocations.reduce((acc, crabLocation) => {
    const delta = Math.abs(crabLocation - targetLocation);
    const result = acc + nthTriangle(delta);
    // console.log({ targetLocation, crabLocation, delta, result });
    return result;
  }, 0);
}

const fuelByLocation: FuelByLocation = {};

for (let location = minCrabLocation; location <= maxCrabLocation; location++) {
  fuelByLocation[location] = calculateFuel(location);
}

for (const location in fuelByLocation) {
  const fuel = fuelByLocation[location];
  console.log({ location, fuel });
}

const minFuel = Object.values(fuelByLocation).sort((a, b) => a - b)[0];

console.log({ minFuel });
