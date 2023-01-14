import { nanoid } from "nanoid";
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let currentColor = "white";

const gameboard = {};

function switchColor() {
  currentColor === "black"
    ? (currentColor = "white")
    : (currentColor = "black");
}

function lettersToNumbers(coord) {
  const [L, N] = [coord[0], coord[1]];
  return `${numbers[letters.findIndex((l) => l === L)]}${N}`;
}

letters.forEach((L) => {
  switchColor();
  numbers.forEach((N) => {
    gameboard[`${L}${N}`] = {
      color: currentColor,
      coord: `${L}${N}`,
      piece: "",
      id: nanoid(),
      highlight: "",
    };
    switchColor();
  });
});

const boardArrays = [
  ["A8", "A7", "A6", "A5", "A4", "A3", "A2", "A1"],
  ["B8", "B7", "B6", "B5", "B4", "B3", "B2", "B1"],
  ["C8", "C7", "C6", "C5", "C4", "C3", "C2", "C1"],
  ["D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1"],
  ["E8", "E7", "E6", "E5", "E4", "E3", "E2", "E1"],
  ["F8", "F7", "F6", "F5", "F4", "F3", "F2", "F1"],
  ["G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1"],
  ["H8", "H7", "H6", "H5", "H4", "H3", "H2", "H1"],
];

export default gameboard;
export { letters, numbers, boardArrays, lettersToNumbers };
