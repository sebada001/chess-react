import { straightStep } from "../moves/straight_moves";
import {
  alphabeticToNumeric,
  numericToAlphabetic,
} from "../moves/move_conversion";

function checkForEnPassant(pawn, currBoard, prevBoard) {
  let move;
  if (
    (pawn.color === "white" && pawn.coord[1] === "5") ||
    (pawn.color === "black" && pawn.coord[1] === "4")
  ) {
    let left = numericToAlphabetic(
      straightStep(alphabeticToNumeric(pawn.coord), "LEFT")
    );
    let right = numericToAlphabetic(
      straightStep(alphabeticToNumeric(pawn.coord), "RIGHT")
    );
    if (
      prevBoard[left].piece?.type !== "pawn" &&
      currBoard[left].piece?.type === "pawn" &&
      currBoard[left].piece?.color !== pawn.color
    ) {
      if (pawn.color === "white") {
        move = numericToAlphabetic(
          straightStep(alphabeticToNumeric(left), "UP")
        );
      } else {
        move = numericToAlphabetic(
          straightStep(alphabeticToNumeric(left), "DOWN")
        );
      }
      return [true, move];
    }
    if (
      prevBoard[right].piece?.type !== "pawn" &&
      currBoard[right].piece?.type === "pawn" &&
      currBoard[right].piece?.color !== pawn.color
    ) {
      if (pawn.color === "white") {
        move = numericToAlphabetic(
          straightStep(alphabeticToNumeric(right), "UP")
        );
      } else {
        move = numericToAlphabetic(
          straightStep(alphabeticToNumeric(right), "DOWN")
        );
      }
      return [true, move];
    }
  }
  return [false];
}

function enPassantCheck(pawn, move, currBoard, prevBoard) {
  if (pawn.type !== "pawn") return [false];
  if (pawn.coord[0] === move[0] || pawn.coord[1] === move[1]) return [false];
  if (pawn.coord[1] === "1" || pawn.coord[1] === "8") return [false];
  if (prevBoard[move].piece !== "") return [false];
  // if pawn move is diagonal and the spot was empty, it was enpassant

  let victimCoord;

  if (pawn.color === "white") {
    victimCoord = numericToAlphabetic(
      straightStep(alphabeticToNumeric(move), "DOWN")
    );
  }
  if (pawn.color === "black") {
    victimCoord = numericToAlphabetic(
      straightStep(alphabeticToNumeric(move), "UP")
    );
  }

  let victim = structuredClone(currBoard[victimCoord].piece);
  currBoard[victimCoord].piece = "";
  return [true, victim];
}

export { checkForEnPassant, enPassantCheck };
