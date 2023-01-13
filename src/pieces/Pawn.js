import pawn_dark from "../images/Chess_pdt45.svg";
import pawn_light from "../images/Chess_plt45.svg";
import { convertMoves } from "../utility/convert_moves";

function Pawn(color, coord) {
  this.type = "pawn";
  this.color = color;
  this.coord = coord;
  this.image = color === "black" ? pawn_dark : pawn_light;
  this.direction = this.color === "black" ? "down" : "up";
  this.moves = this.color === "black" ? blackMoves : whiteMoves;
  this.startingPosition = true;
}

const whiteMoves = {
  move: [0, 1],
  start: [0, 2],
  attack: [
    [1, 1],
    [-1, 1],
  ],
};

const blackMoves = {
  move: [0, -1],
  start: [0, -2],
  attack: [
    [1, -1],
    [-1, -1],
  ],
};

function calculatePawnMoves(piece, board) {
  let allMoves = [];
  let pieceMoves = piece.moves;

  allMoves.push(convertMoves(piece.coord, pieceMoves["move"]));
  if (piece.startingPosition === true) {
    allMoves.push(convertMoves(piece.coord, pieceMoves["start"]));
  }
  let attacks = locatePawnEnemy(piece, board);
  if (attacks) {
    attacks.forEach((move) => allMoves.push(move));
  }
  return allMoves;
}

function locatePawnEnemy(piece, board) {
  let located = [];
  if (piece.color === "white") {
    let spotLeft = board[convertMoves(piece.coord, [-1, 1])];
    let spotRight = board[convertMoves(piece.coord, [1, 1])];
    if (spotLeft !== undefined && spotLeft.piece) {
      located.push(spotLeft);
    }
    if (spotRight !== undefined && spotRight.piece) {
      located.push(spotRight);
    }
  }
  if (piece.color === "black") {
    let spotLeft = board[convertMoves(piece.coord, [-1, -1])];
    let spotRight = board[convertMoves(piece.coord, [1, -1])];
    if (spotLeft !== undefined && spotLeft.piece) {
      located.push(spotLeft);
    }
    if (spotRight !== undefined && spotRight.piece) {
      located.push(spotRight);
    }
  }
  return located;
}

const calculateMoves = {
  pawn: calculatePawnMoves,
};

export default Pawn;
export { calculateMoves };
