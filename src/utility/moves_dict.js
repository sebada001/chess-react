import { calculatePawnMoves } from "../pieces/Pawn";
import { calculateBishopMoves } from "../pieces/Bishop";
import { calculateKingMoves } from "../pieces/King";
import { calculateRookMoves } from "../pieces/Rook";
import { calculateQueenMoves } from "../pieces/Queen";

const movesDict = {
  pawn: calculatePawnMoves,
  bishop: calculateBishopMoves,
  king: calculateKingMoves,
  rook: calculateRookMoves,
  queen: calculateQueenMoves,
};
export { movesDict };
