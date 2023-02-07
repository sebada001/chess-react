import { movesDict } from "../utility/moves_dict";
import { findKing } from "../utility/find_king";
import { getAllPieces } from "../utility/get_all_pieces";

function inCheck(board, playerColor, playerKing) {
  let keys = Object.keys(board);

  for (let i = 0; i < keys.length; i++) {
    let coord = keys[i];
    let color = board[coord]?.piece?.color;
    if (color && color !== playerColor) {
      let piece = board[coord].piece;
      let pieceMoves = movesDict[piece.type](piece, board);
      // if (piece.type === "queen") {
      // }
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
  return checked;
};

const moveSafety = function (moves, board, piece, currentPlayerColor) {
  if (moves.includes(undefined)) return [];
  const pieceCopy = { ...piece };
  const boardCopy = structuredClone(board);
  const color = currentPlayerColor;
  let lastMove = pieceCopy.coord;
  const allowedMoves = [];
  const kingCopy = { ...findKing(boardCopy, color) };

  moves.forEach((move) => {
    boardCopy[move].piece = pieceCopy;

    if (board[lastMove]?.piece?.color === currentPlayerColor) {
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

const checkMate = function (board, player, opponent) {
  const allMyMoves = [];
  const allOpponentMoves = [];
  const boardCopy = structuredClone(board);
  const myColor = player.color;

  const opponentColor = opponent.color;
  const opponentKing = findKing(boardCopy, opponentColor);

  const allMyPieces = getAllPieces(boardCopy, myColor);
  allMyPieces.forEach((piece) => {
    const moves = movesDict[piece.type](piece, boardCopy);
    let safeMoves = moveSafety(moves, boardCopy, piece, player);
    safeMoves.forEach((move) => {
      allMyMoves.push(move);
    });
  });

  const allOpponentPieces = getAllPieces(boardCopy, opponentColor);
  allOpponentPieces.forEach((piece) => {
    const moves = movesDict[piece.type](piece, boardCopy);
    let safeMoves = moveSafety(moves, boardCopy, piece, opponent.color);
    safeMoves.forEach((move) => {
      allOpponentMoves.push(move);
    });
  });
  if (allMyMoves.includes(opponentKing.coord) && allOpponentMoves.length === 0)
    return true;
  return false;
};

export { inCheck, checkForChecks, moveSafety, checkMate };
