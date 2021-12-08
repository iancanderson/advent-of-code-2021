import * as fs from "fs";

const input = fs.readFileSync("src/day6-input.txt", "utf8");

type School = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

function tick(school: School): School {
  return [
    school[1],
    school[2],
    school[3],
    school[4],
    school[5],
    school[6],
    school[7] + school[0],
    school[8],
    school[0],
  ];
}

function parseSchool(input: string): School {
  const fishes: number[] = input.split(",").map((fish) => {
    return parseInt(fish);
  });
  const school = fishes.reduce(
    (acc, fish) => {
      console.log({ acc });
      console.log({ fish });

      return acc.map((count, index) => {
        if (fish === index) {
          return count + 1;
        }
        return count;
      }) as School;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0] as School
  );
  console.log({ school });
  return school;
}

let school = parseSchool(input);

for (let day = 1; day <= 256; day++) {
  console.log(`Day ${day}`);
  school = tick(school);
}

const result = school.reduce((acc, count) => acc + count);
console.log(result, " fishes");
