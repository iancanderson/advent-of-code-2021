import * as fs from "fs";
import { relative } from "path/posix";

const input = fs.readFileSync("src/day5-input.txt", "utf8");
const lines = input.split("\n");

enum VerticalDirection {
  Up,
  Down,
}

function relativeVerticalDirection(start: Point, end: Point) {
  if (start.y > end.y) {
    return VerticalDirection.Down;
  } else if (start.y < end.y) {
    return VerticalDirection.Up;
  } else {
    return undefined;
  }
}

class LineSegment {
  endpoints: [Point, Point];

  constructor(endpoints: [Point, Point]) {
    this.endpoints = endpoints;
  }

  isDiagonal(): boolean {
    return (
      this.endpoints[0].x !== this.endpoints[1].x &&
      this.endpoints[0].y !== this.endpoints[1].y
    );
  }

  // [1,1] -> [3,3] covers [1,1] and [2,2] and [3,3]
  points(): Point[] {
    const points: Point[] = [];
    if (this.isDiagonal()) {
      // Sort endpoints by x
      const sortedEndpoints = this.endpoints.sort((a, b) => a.x - b.x);
      // Add all points in between
      let y = sortedEndpoints[0].y;

      const direction = relativeVerticalDirection(
        sortedEndpoints[0],
        sortedEndpoints[1]
      );

      for (let x = sortedEndpoints[0].x; x <= sortedEndpoints[1].x; x++) {
        points.push(new Point(x, y));
        if (direction === VerticalDirection.Up) {
          y++;
        } else if (direction === VerticalDirection.Down) {
          y--;
        }
      }
    } else {
      for (let x = this.minX(); x <= this.maxX(); x++) {
        for (let y = this.minY(); y <= this.maxY(); y++) {
          points.push(new Point(x, y));
        }
      }
    }
    return points;
  }

  maxY(): number {
    return Math.max(...this.endpoints.map((p) => p.y));
  }

  minX(): number {
    return Math.min(...this.endpoints.map((p) => p.x));
  }

  maxX(): number {
    return Math.max(...this.endpoints.map((p) => p.x));
  }

  minY(): number {
    return Math.min(...this.endpoints.map((p) => p.y));
  }
}

function parsePoint(str: string): Point {
  const [x, y] = str.split(",").map(Number);
  return new Point(x, y);
}

function parseLine(line: string): LineSegment {
  const pointStrings = line.split(" -> ");
  return new LineSegment([
    parsePoint(pointStrings[0]),
    parsePoint(pointStrings[1]),
  ]);
}

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

interface NumLinesByPoint {
  [point: string]: number;
}

const validLines: LineSegment[] = lines
  .filter((line) => line.length > 0)
  .map(parseLine);

let numLinesByPoint: NumLinesByPoint = {};
numLinesByPoint = validLines.reduce((acc, line) => {
  line.points().forEach((point) => {
    acc[point.toString()] = (acc[point.toString()] || 0) + 1;
  });
  return acc;
}, numLinesByPoint);

function numPointsOfOverlap(numLinesByPoint: NumLinesByPoint): number {
  return Object.values(numLinesByPoint).filter((numLines) => numLines > 1)
    .length;
}

const numOverlappingPoints = numPointsOfOverlap(numLinesByPoint);
console.log({ numOverlappingPoints });
