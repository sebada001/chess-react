import { straightOpponents } from "./straight_moves";
import { diagonalOpponents } from "./diagonal_moves";
import { getAllPieces } from "../utility/get_all_pieces";
import lSteps from "./knight_moves";

function underAttack(spot, board, color) {
  const enemyPieces = getAllPieces(
    board,
    color === "black" ? "white" : "black"
  );
  const enemyLocations = enemyPieces.map((piece) => {
    return { coord: piece.coord, type: piece.type };
  });
  const knights = enemyPieces.filter((piece) => piece.type === "knight");
  let knightAttacks = [];
  knights.forEach((knight) => {
    let knightMoves = lSteps(knight.coord, board, knight.color);
    knightAttacks = [...knightAttacks, ...knightMoves];
  });
  let diagAttacks = diagonalOpponents(color, "queen", spot, board);
  let straightAttacks = straightOpponents(color, "rook", spot, board);
  let dangerPawns = diagonalOpponents(color, "pawn", spot, board);
  let dangerKing = diagonalOpponents(color, "king", spot, board);
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
    if (dangerKing.includes(enemy.coord) && enemy.type === "king") {
      return true;
    }
    if (knightAttacks.includes(enemy.coord) && enemy.type === "knight") {
      return true;
    }
  }

  return false;
}

export { underAttack };
