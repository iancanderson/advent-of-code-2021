import * as fs from "fs";

interface Position {
  horizontal: number;
  depth: number;
}

let position: Position = {
  horizontal: 0,
  depth: 0,
};

enum CommandDirection {
  Forward,
  Down,
  Up,
}

interface Command {
  direction: CommandDirection;
  steps: number;
}

// Read input file
const input = fs.readFileSync("src/day2-input.txt", "utf8");

function parseCommand(command: string): Command {
  const [direction, stepsStr] = command.split(" ");
  const steps = parseInt(stepsStr, 10);

  switch (direction) {
    case "up":
      return { direction: CommandDirection.Up, steps };
    case "down":
      return { direction: CommandDirection.Down, steps };
    case "forward":
      return { direction: CommandDirection.Forward, steps };
    default:
      throw new Error("Unknown command: " + command);
  }
}

function processCommand(position: Position, command: Command): Position {
  switch (command.direction) {
    case CommandDirection.Forward:
      return {
        ...position,
        horizontal: position.horizontal + command.steps,
      };
    case CommandDirection.Down:
      return {
        ...position,
        depth: position.depth + command.steps,
      };
    case CommandDirection.Up:
      return {
        ...position,
        depth: position.depth - command.steps,
      };
  }
}

input.split("\n").forEach((line) => {
  // quit if blank line
  if (line.length === 0) {
    return;
  }
  const command = parseCommand(line);
  position = processCommand(position, command);
});

console.log(position);
console.log(position.depth * position.horizontal);
