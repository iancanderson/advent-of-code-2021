import * as fs from "fs";

const input = fs.readFileSync("src/day5-input.txt", "utf8");
const lines = input.split("\n");

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

  points(): Point[] {
    const points: Point[] = [];
    for (let x = this.minX(); x <= this.maxX(); x++) {
      for (let y = this.minY(); y <= this.maxY(); y++) {
        points.push(new Point(x, y));
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
  .map(parseLine)
  .filter((segment) => !segment.isDiagonal());

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
