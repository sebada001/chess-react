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

// const Rook = (color, pieceSide, coord) => {
//   let img = "";
//   img = color === "black" ? rook_dark : rook_light;
//   const display = () => img;
//   const side = () => pieceSide;
//   let coordinate = coord;
//   const position = (pos) => (coordinate = pos);
//   return { display, side, position };
// };

export default Rook;
export { calculateRookMoves };
