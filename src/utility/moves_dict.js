import Bishop, { calculateBishopMoves } from "../pieces/Bishop";
import { calculateKingMoves } from "../pieces/King";
import Rook, { calculateRookMoves } from "../pieces/Rook";
import Queen, { calculateQueenMoves } from "../pieces/Queen";
import Knight, { calculateKnightMoves } from "../pieces/Knight";
import { calculatePawnMoves } from "../pieces/Pawn";

const movesDict = {
  pawn: calculatePawnMoves,
  bishop: calculateBishopMoves,
  king: calculateKingMoves,
  rook: calculateRookMoves,
  queen: calculateQueenMoves,
  knight: calculateKnightMoves,
};

const factoryDict = {
  bishop: Bishop,
  rook: Rook,
  queen: Queen,
  knight: Knight,
};
export { movesDict, factoryDict };
