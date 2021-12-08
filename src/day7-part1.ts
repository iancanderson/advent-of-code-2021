import * as fs from "fs";

const input = fs.readFileSync("src/day7-input.txt", "utf8");
const crabLocations = input.split(",").map(Number);
crabLocations.sort();

console.log({ crabLocations });

const minCrabLocation = crabLocations[0];
const maxCrabLocation = crabLocations[crabLocations.length - 1];

type Location = number;
type Fuel = number;

interface FuelByLocation {
  [location: Location]: Fuel;
}

function calculateFuel(targetLocation: Location): Fuel {
  return crabLocations.reduce((acc, crabLocation) => {
    return acc + Math.abs(crabLocation - targetLocation);
  }, 0);
}

const fuelByLocation: FuelByLocation = {};

for (let location = minCrabLocation; location <= maxCrabLocation; location++) {
  fuelByLocation[location] = calculateFuel(location);
}

const minFuel = Object.values(fuelByLocation).sort()[0];

console.log({ minFuel });
