import bishop_dark from "../images/Chess_bdt45.svg";
import bishop_light from "../images/Chess_blt45.svg";
import { diagonalMoves, diagonalOpponents } from "../moves/diagonal_moves";
import { nanoid } from "nanoid";

function Bishop(color, coord) {
  this.type = "bishop";
  this.color = color;
  this.coord = coord;
  this.image = color === "black" ? bishop_dark : bishop_light;
  this.direction = this.color === "black" ? "down" : "up";
  this.startingPosition = true;
  this.id = nanoid();
}

function calculateBishopMoves(piece, board) {
  let allMoves = [];
  let movements = [];
  let attacks = [];
  movements = diagonalMoves(piece.color, piece.type, piece.coord, board);
  attacks = diagonalOpponents(piece.color, piece.type, piece.coord, board);
  allMoves = [...movements, ...attacks];

  return allMoves;
}

export default Bishop;
export { calculateBishopMoves };
