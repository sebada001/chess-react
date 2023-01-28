import king_dark from "../images/Chess_kdt45.svg";
import king_light from "../images/Chess_klt45.svg";
import { nanoid } from "nanoid";
import { diagonalOpponents, diagonalMoves } from "../moves/diagonal_moves";
import { straightMoves, straightOpponents } from "../moves/straight_moves";

function King(color, coord) {
  this.color = color;
  this.type = "king";
  this.coord = coord;
  this.image = color === "black" ? king_dark : king_light;
  this.id = nanoid();
}

function calculateKingMoves(piece, board) {
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

export default King;
export { calculateKingMoves };
