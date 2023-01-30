import { movesDict } from "../utility/moves_dict";
import { findKing } from "../utility/find_king";

function inCheck(board, playerColor, playerKing) {
  let keys = Object.keys(board);

  for (let i = 0; i < keys.length; i++) {
    let coord = keys[i];
    let color = board[coord]?.piece?.color;
    if (color && color !== playerColor) {
      let piece = board[coord].piece;
      let pieceMoves = movesDict[piece.type](piece, board);
      if (piece.type === "queen") {
      }
      if (pieceMoves.includes(playerKing.coord)) {
        return true;
      }
    }
    continue;
  }
  return false;
}

const checkForChecks = (board, color, king) => {
  let checked = inCheck(board, color, king);
  console.log(`${color} is in check: ${checked}`);
  return checked;
};

const moveSafety = function (moves, board, piece, currentPlayer) {
  if (moves.includes(undefined)) return [];
  const pieceCopy = { ...piece };
  const boardCopy = {};
  for (let key in board) {
    boardCopy[key] = { ...board[key] };
  } // 2 level deep copy of board
  const color = currentPlayer.color;
  let lastMove = pieceCopy.coord;
  const allowedMoves = [];
  const kingCopy = { ...findKing(boardCopy, color) };

  moves.forEach((move) => {
    boardCopy[move].piece = pieceCopy;

    if (board[lastMove]?.piece?.color === currentPlayer.color) {
      boardCopy[lastMove].piece = "";
    } else {
      boardCopy[lastMove].piece = board[lastMove].piece;
    }
    pieceCopy.coord = move;
    if (pieceCopy.type === "king") kingCopy.coord = move;
    if (!checkForChecks(boardCopy, color, kingCopy)) allowedMoves.push(move);
    lastMove = move;
  });

  return allowedMoves;
};

export { inCheck, checkForChecks, moveSafety };
