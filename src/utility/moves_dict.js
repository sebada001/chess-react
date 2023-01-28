import { calculatePawnMoves } from "../pieces/Pawn";
import { calculateBishopMoves } from "../pieces/Bishop";
import { calculateKingMoves } from "../pieces/King";
import { calculateRookMoves } from "../pieces/Rook";
import { calculateQueenMoves } from "../pieces/Queen";
import { calculateKnightMoves } from "../pieces/Knight";

const movesDict = {
  pawn: calculatePawnMoves,
  bishop: calculateBishopMoves,
  king: calculateKingMoves,
  rook: calculateRookMoves,
  queen: calculateQueenMoves,
  knight: calculateKnightMoves,
};
export { movesDict };
