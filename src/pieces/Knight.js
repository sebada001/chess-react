import knight_dark from "../images/Chess_ndt45.svg";
import knight_light from "../images/Chess_nlt45.svg";
import { nanoid } from "nanoid";
import lSteps from "../moves/knight_moves";

class Knight {
  constructor(color, coord) {
    this.color = color;
    this.type = "knight";
    this.coord = coord;
    this.image = color === "black" ? knight_dark : knight_light;
    this.id = nanoid();
  }
}

function calculateKnightMoves(piece, board) {
  let allMoves = [];

  allMoves = lSteps(piece.coord, board, piece.color);

  return allMoves;
}

export default Knight;
export { calculateKnightMoves };
