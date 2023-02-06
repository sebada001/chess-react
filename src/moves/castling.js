import { getAllPieces } from "../utility/get_all_pieces";
import { getRooks } from "../utility/get_rooks";
import { underAttack } from "./under_attack";

function checkCastling(king, board) {
  if (!king.startingPosition) return [false, false];
  let leftCastling = true;
  let rightCastling = true;
  const allyPieces = getAllPieces(board, king.color);
  const allyRooks = getRooks(allyPieces);
  const enemyPieces = getAllPieces(
    board,
    king.color === "black" ? "white" : "black"
  );
  let leftZone = ["B1", "C1", "D1"];
  let rightZone = ["G1", "F1"];
  let rookLeft = "A1";
  let rookRight = "H1";
  if (king.color === "black") {
    rookLeft = "A8";
    rookRight = "H8";
    leftZone = ["B8", "C8", "D8"];
    rightZone = ["G8", "F8"];
  }

  //left
  if (!allyRooks.find((r) => r.initialCoord === rookLeft).startingPosition) {
    leftCastling = false;
  } else {
    if (
      allyPieces.some((piece) => leftZone.includes(piece.coord)) ||
      enemyPieces.some((piece) => leftZone.includes(piece.coord))
    ) {
      leftCastling = false;
    }
    if (leftZone.some((loc) => underAttack(loc, board, king.color))) {
      leftCastling = false;
    }
  }

  //right
  if (!allyRooks.find((r) => r.initialCoord === rookRight).startingPosition) {
    rightCastling = false;
  } else {
    if (
      allyPieces.some((piece) => rightZone.includes(piece.coord)) ||
      enemyPieces.some((piece) => rightZone.includes(piece.coord))
    ) {
      rightCastling = false;
    }
    if (rightZone.some((loc) => underAttack(loc, board, king.color))) {
      rightCastling = false;
    }
  }

  return [leftCastling, rightCastling];
}

function getCastling(king, board) {
  let bools;
  let moves = [];
  bools = checkCastling(king, board);
  if (king.color === "white") {
    if (bools[0]) moves.push("C1");
    if (bools[1]) moves.push("G1");
  } else {
    if (bools[0]) moves.push("C8");
    if (bools[1]) moves.push("G8");
  }

  return moves;
}

export { getCastling };
