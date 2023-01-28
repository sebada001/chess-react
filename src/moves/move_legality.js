import { alphabeticToNumeric, numericToAlphabetic } from "./move_conversion";

function isMovementLegal(move, board) {
  if (move.length > 2) return false;

  move = alphabeticToNumeric(move);

  let moveArray = move.split("");
  if (moveArray.some((m) => m < 1 || m > 8)) return false;

  let alphaMove = numericToAlphabetic(move);
  if (board[alphaMove].piece !== "") return false;
  return true;
}

function isAttackLegal(move, board, color) {
  if (move.length > 2) return false;

  move = alphabeticToNumeric(move);

  let moveArray = move.split("");
  if (moveArray.some((m) => m < 1 || m > 8)) return false;

  let alphaMove = numericToAlphabetic(move);
  if (
    board[alphaMove]?.piece?.color &&
    board[alphaMove]?.piece?.color !== color
  )
    return true;

  return false;
}

function isBlocked(move, board, color) {
  if (board[move]?.piece?.color === color) {
    return true;
  }
  return false;
}

export { isMovementLegal, isAttackLegal, isBlocked };
