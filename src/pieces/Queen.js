import queen_dark from "../images/Chess_qdt45.svg";
import queen_light from "../images/Chess_qlt45.svg";
import { diagonalOpponents, diagonalMoves } from "../moves/diagonal_moves";
import { straightMoves, straightOpponents } from "../moves/straight_moves";
import { nanoid } from "nanoid";

class Queen {
  constructor(color, coord) {
    this.color = color;
    this.type = "queen";
    this.coord = coord;
    this.image = color === "black" ? queen_dark : queen_light;
    this.id = nanoid();
  }
}

function calculateQueenMoves(piece, board) {
  let allMoves = [];
  let movements = [];
  let attacks = [];

  movements = [
    ...straightMoves(piece.color, piece.type, piece.coord, board),
    ...diagonalMoves(piece.color, piece.type, piece.coord, board),
  ];
  attacks = [
    ...diagonalOpponents(piece.color, piece.type, piece.coord, board),
    ...straightOpponents(piece.color, piece.type, piece.coord, board),
  ];
  allMoves = [...movements, ...attacks];

  return allMoves;
}

export default Queen;

export { calculateQueenMoves };
