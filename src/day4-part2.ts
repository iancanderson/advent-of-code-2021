import * as fs from "fs";

const input = fs.readFileSync("src/day4-input.txt", "utf8");
const lines = input.split("\n");
const numbersCalled = lines[0].split(",").map(Number);

interface CalledBingoNumber {
  called: true;
}
interface UncalledBingoNumber {
  called: false;
  number: number;
}
type BingoNumber = CalledBingoNumber | UncalledBingoNumber;

class BingoCard {
  #rows: BingoNumber[][];
  #columns: BingoNumber[][] = [];

  constructor(numbersByRow: number[][]) {
    this.#rows = numbersByRow.map((row) =>
      row.map((number) => ({ called: false, number }))
    );
    for (let col = 0; col < numbersByRow.length; col++) {
      this.#columns.push([]);

      for (let row = 0; row < numbersByRow.length; row++) {
        this.#columns[col].push(this.#rows[row][col]);
      }
    }
  }

  callNumber(num: number) {
    this.#rows = this.#markNumbersAsCalled(this.#rows, num);
    this.#columns = this.#markNumbersAsCalled(this.#columns, num);
  }

  hasWon(): boolean {
    return (
      this.#rows.some((row) => row.every((number) => number.called)) ||
      this.#columns.some((col) => col.every((number) => number.called))
    );
  }

  score(winningNumber: number): number {
    const uncalledNumberSum = this.#rows.reduce((sum, row) => {
      return (
        sum +
        row.reduce((sum, number) => {
          return number.called ? sum : sum + number.number;
        }, 0)
      );
    }, 0);
    return uncalledNumberSum * winningNumber;
  }

  display(): string {
    return this.#rows
      .map((row) =>
        row.map((number) => (number.called ? "X" : number.number)).join(" ")
      )
      .join("\n");
  }

  #markNumbersAsCalled(nums: BingoNumber[][], num: number): BingoNumber[][] {
    return nums.map((row) => {
      return row.map((number) => {
        if (!number.called && number.number === num) {
          return { called: true };
        } else {
          return number;
        }
      });
    });
  }
}

function buildBingoCards(): BingoCard[] {
  const bingoCards = [];
  for (let l = 2; l < lines.length; l += 6) {
    let numbers: number[][] = [];
    for (let row = 0; row < 5; row++) {
      numbers.push(
        lines[l + row]
          .trim()
          .split(/\s+/)
          .map((str) => parseInt(str))
      );
    }
    const card = new BingoCard(numbers);
    console.log(card.display());
    bingoCards.push(card);
  }
  return bingoCards;
}

// Cards in play have not won yet
let cardsInPlay = buildBingoCards();

for (const num of numbersCalled) {
  console.log("Calling number: ", num);

  for (const card of cardsInPlay) {
    card.callNumber(num);
    // console.log(card.display());
  }

  // Remove winning cards
  const winningCards = cardsInPlay.filter((card) => card.hasWon());
  cardsInPlay = cardsInPlay.filter((card) => !card.hasWon());

  if (cardsInPlay.length == 0) {
    const winningCard = winningCards[0];
    console.log("Last winning card:\n", winningCard.display());
    console.log("Last winning number: ", num);
    console.log("Last winning card score: ", winningCard.score(num));
    break;
  }
}
