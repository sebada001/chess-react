import { nanoid } from "nanoid";
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let currentColor = "black";

const gameboard = {};

function switchColor() {
  currentColor === "black"
    ? (currentColor = "white")
    : (currentColor = "black");
}

const Square = (col, coordinate) => {
  const squareColor = col;
  const squareCoordinate = coordinate;
  const squareId = nanoid();
  let squarePiece = null;

  const place = (p) => {
    squarePiece = p;
  };
  const move = () => (squarePiece = null);
  const color = () => squareColor;
  const coord = () => squareCoordinate;
  const id = () => squareId;
  const piece = () => squarePiece;
  return { place, move, color, coord, id, piece };
};

letters.forEach((L) => {
  switchColor();
  numbers.forEach((N) => {
    gameboard[`${L}${N}`] = Square(currentColor, `${L}${N}`);
    switchColor();
  });
});

const boardArrays = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"],
  ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8"],
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
];

export default gameboard;
export { letters, numbers, boardArrays };
