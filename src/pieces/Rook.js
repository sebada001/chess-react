import rook_dark from "../images/Chess_rdt45.svg";
import rook_light from "../images/Chess_rlt45.svg";
import { nanoid } from "nanoid";
import { straightMoves, straightOpponents } from "../moves/straight_moves";

class Rook {
  constructor(color, coord) {
    this.color = color;
    this.type = "rook";
    this.coord = coord;
    this.image = color === "black" ? rook_dark : rook_light;
    this.startingPosition = true;
    this.initialCoord = coord;
    this.id = nanoid();
  }
}

function calculateRookMoves(piece, board) {
  let allMoves = [];
  let movements = [];
  let attacks = [];

  movements = straightMoves(piece.color, piece.type, piece.coord, board);
  attacks = straightOpponents(piece.color, piece.type, piece.coord, board);
  allMoves = [...movements, ...attacks];

  return allMoves;
}

export default Rook;
export { calculateRookMoves };
