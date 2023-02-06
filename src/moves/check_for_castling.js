// import { findKing } from "../utility/find_king";

function checkForCastling(piece) {
  if (piece.type !== "king" || piece.startingPosition !== true) return [false];
  if (piece.coord === "G1") {
    return [true, "H1", "F1"];
  }
  if (piece.coord === "C1") {
    return [true, "A1", "D1"];
  }
  if (piece.coord === "G8") {
    return [true, "H8", "F8"];
  }
  if (piece.coord === "C8") {
    return [true, "A8", "D8"];
  }
  return [false];
}

export { checkForCastling };
