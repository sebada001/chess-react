import pawn_dark from "../images/Chess_pdt45.svg";
import pawn_light from "../images/Chess_plt45.svg";
import { diagonalOpponents } from "../moves/diagonal_moves";
import { straightMoves, pawnStart } from "../moves/straight_moves";
import { nanoid } from "nanoid";

class Pawn {
  constructor(color, coord) {
    this.type = "pawn";
    this.color = color;
    this.coord = coord;
    this.image = color === "black" ? pawn_dark : pawn_light;
    this.direction = this.color === "black" ? "DOWN" : "UP";
    this.startingPosition = true;
    this.id = nanoid();
  }
}

function calculatePawnMoves(piece, board) {
  let allMoves = [];
  let movements = [];
  let attacks = [];

  movements = straightMoves(piece.color, piece.type, piece.coord, board);
  attacks = diagonalOpponents(piece.color, piece.type, piece.coord, board);
  allMoves = [...movements, ...attacks];

  let doubleJump = pawnStart(piece.coord, piece.direction, board);
  if (piece.startingPosition === true && doubleJump) {
    allMoves.push(doubleJump);
  }
  return allMoves;
}

export default Pawn;
export { calculatePawnMoves };
