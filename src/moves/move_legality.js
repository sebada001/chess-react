import { alphabeticToNumeric, numericToAlphabetic } from "./move_conversion";

function isLegal(move, board) {
  if (move.length > 2) return false;

  move = alphabeticToNumeric(move);

  let moveArray = move.split("");
  if (moveArray.some((m) => m < 1 || m > 8)) return false;

  let alphaMove = numericToAlphabetic(move);
  if (board[alphaMove].piece !== "") return false;
  return true;
}

export { isLegal };
