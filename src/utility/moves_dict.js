import { calculatePawnMoves } from "../pieces/Pawn";
import { calculateBishopMoves } from "../pieces/Bishop";
import { calculateKingMoves } from "../pieces/King";
import { calculateRookMoves } from "../pieces/Rook";

const movesDict = {
  pawn: calculatePawnMoves,
  bishop: calculateBishopMoves,
  king: calculateKingMoves,
  rook: calculateRookMoves,
};
export { movesDict };
