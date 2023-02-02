import { getAllPieces } from "../utility/get_all_pieces";
import { straightOpponents } from "./straight_moves";
import { diagonalOpponents } from "./diagonal_moves";

function checkWhiteCastling(king, board) {
  console.log("check");
  if (!king.startingPosition) return [false, false];
  let leftCastling = true;
  let rightCastling = true;
  const allyPieces = getAllPieces(board, king.color);
  const enemyPieces = getAllPieces(
    board,
    king.color === "black" ? "white" : "black"
  );
  const leftZone = ["B1", "C1", "D1"];
  const rightZone = ["G1", "F1"];
  if (
    allyPieces.some((piece) => leftZone.includes(piece.coord)) ||
    enemyPieces.some((piece) => leftZone.includes(piece.coord))
  ) {
    leftCastling = false;
  }
  if (
    allyPieces.some((piece) => rightZone.includes(piece.coord)) ||
    enemyPieces.some((piece) => rightZone.includes(piece.coord))
  ) {
    rightCastling = false;
  }
  if (rightZone.some((loc) => underAttack(loc, board, king.color))) {
    rightCastling = false;
  }

  return [leftCastling, rightCastling];
}

function underAttack(spot, board, color) {
  const enemyPieces = getAllPieces(
    board,
    color === "black" ? "white" : "black"
  );
  const enemyLocations = enemyPieces.map((piece) => {
    return { coord: piece.coord, type: piece.type };
  });
  let diagAttacks = diagonalOpponents(color, "queen", spot, board);
  let straightAttacks = straightOpponents(color, "rook", spot, board);
  let dangerPawns = diagonalOpponents(color, "pawn", spot, board);
  for (let enemy of enemyLocations) {
    if (
      diagAttacks.includes(enemy.coord) &&
      (enemy.type === "bishop" || enemy.type === "queen")
    ) {
      return true;
    }
    if (
      straightAttacks.includes(enemy.coord) &&
      (enemy.type === "bishop" || enemy.type === "queen")
    ) {
      return true;
    }
    if (
      dangerPawns.includes(enemy.coord) &&
      (enemy.type === "pawn" || enemy.type === "king")
    ) {
      return true;
    }
  }

  return false;
}

function checkBlackCastling(king, board) {
  if (!king.startingPosition) return [false, false];
  let leftCastling = true;
  let rightCastling = true;

  Object.keys(board).forEach((spot) => {
    let piece = board[spot]?.piece;
    if (piece) {
      if (
        piece.coord === "B8" ||
        piece.coord === "C8" ||
        piece.coord === "D8"
      ) {
        leftCastling = false;
      }
      if (piece.coord === "A8" && !piece.startingPosition) {
        leftCastling = false;
      }
      if (piece.coord === "G8" || piece.coord === "F8") {
        rightCastling = false;
      }
      if (piece.coord === "H8" && !piece.startingPosition) {
        rightCastling = false;
      }
    } else {
      if (spot === "A8") {
        leftCastling = false;
      }
      if (spot === "H8") {
        rightCastling = false;
      }
    }
  });

  return [leftCastling, rightCastling];
}

function getCastling(king, board) {
  let bools;
  let moves = [];
  if (king.color === "white") {
    bools = checkWhiteCastling(king, board);
    if (bools[0]) moves.push("C1");
    if (bools[1]) moves.push("G1");
  }
  if (king.color === "black") {
    bools = checkBlackCastling(king, board);
    if (bools[0]) moves.push("C8");
    if (bools[1]) moves.push("G8");
  }
  return moves;
}

export { getCastling };
