import { calculatePawnMoves } from "../pieces/Pawn";
import { calculateBishopMoves } from "../pieces/Bishop";

const movesDict = {
  pawn: calculatePawnMoves,
  bishop: calculateBishopMoves,
};
export { movesDict };
