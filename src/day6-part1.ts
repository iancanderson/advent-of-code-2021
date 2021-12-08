import * as fs from "fs";

const input = fs.readFileSync("src/day6-input.txt", "utf8");

class School {
  fishes: number[];

  constructor(fishes: number[]) {
    this.fishes = fishes;
  }

  // A day elapses
  tick() {
    let newBabyCount = 0;

    // Decrement days
    this.fishes = this.fishes.map((fish) => {
      if (fish == 0) {
        newBabyCount++;
        return 6;
      } else {
        return fish - 1;
      }
    });

    // Spawn babies
    const babies = new Array(newBabyCount).fill(8);
    this.fishes = this.fishes.concat(babies);
  }
}

function parseSchool(input: string): School {
  const fishes: number[] = input.split(",").map((fish) => {
    return parseInt(fish);
  });
  return new School(fishes);
}

const school = parseSchool(input);

for (let day = 1; day <= 80; day++) {
  console.log(`Day ${day}`);
  school.tick();
}

console.log(school.fishes.length, " fishes");
