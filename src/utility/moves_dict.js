import { calculatePawnMoves } from "../pieces/Pawn";
import { calculateBishopMoves } from "../pieces/Bishop";
import { calculateKingMoves } from "../pieces/King";

const movesDict = {
  pawn: calculatePawnMoves,
  bishop: calculateBishopMoves,
  king: calculateKingMoves,
};
export { movesDict };
