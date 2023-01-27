import { numbers, letters } from "../utility/gameboard";

function numericToAlphabetic(move) {
  let moveArray = move.split("");
  if (!numbers.includes(Number(moveArray[0]))) return move;
  let letter = letters[Number(moveArray[0]) - 1];
  return `${letter}${moveArray[1]}`;
}
function alphabeticToNumeric(move) {
  let moveArray = move.split("");
  if (!letters.includes(moveArray[0])) return move;

  let number = letters.findIndex((l) => l === moveArray[0]) + 1;
  return `${number}${moveArray[1]}`;
}

export { numericToAlphabetic, alphabeticToNumeric };
