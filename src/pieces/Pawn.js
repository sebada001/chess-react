import pawn_dark from "../images/Chess_pdt45.svg";
import pawn_light from "../images/Chess_plt45.svg";
import { convertMoves } from "../utility/convert_moves";
import { diagonalMoves } from "../moves/diagonal_moves";

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
  let movements = [];
  let pieceMoves = piece.moves;

  //movements
  movements.push(convertMoves(piece.coord, pieceMoves["move"]));
  if (piece.startingPosition === true) {
    movements.push(convertMoves(piece.coord, pieceMoves["start"]));
  }
  movements = movements.filter((move) => !(move === undefined));
  cleanObstaclesUpDown(board, movements, piece).forEach((move) =>
    allMoves.push(move)
  );

  //attacks
  let attackSpots = locatePawnEnemy(piece, board);
  if (attackSpots) {
    friendlyFire(board, attackSpots, piece).forEach((move) =>
      allMoves.push(move)
    );
  }

  // console.log(diagonalMoves(piece.color, piece.type, piece.coord, board));

  return allMoves;
}

function locatePawnEnemy(piece, board) {
  let located = [];
  if (piece.color === "white") {
    let spotLeft = board[convertMoves(piece.coord, [-1, 1])];
    let spotRight = board[convertMoves(piece.coord, [1, 1])];
    if (spotLeft !== undefined && spotLeft.piece) {
      located.push(spotLeft.coord);
    }
    if (spotRight !== undefined && spotRight.piece) {
      located.push(spotRight.coord);
    }
  }
  if (piece.color === "black") {
    let spotLeft = board[convertMoves(piece.coord, [-1, -1])];
    let spotRight = board[convertMoves(piece.coord, [1, -1])];
    if (spotLeft !== undefined && spotLeft.piece) {
      located.push(spotLeft.coord);
    }
    if (spotRight !== undefined && spotRight.piece) {
      located.push(spotRight.coord);
    }
  }
  return located;
}

function friendlyFire(board, moves, piece) {
  return moves.filter((move) => board[move].piece?.color !== piece.color);
}

function cleanObstaclesUpDown(board, moves, piece) {
  moves.forEach((move) => {
    if (board[move].piece !== "") {
      if (piece.color === "white") {
        moves = moves.filter(
          (mov) => !(mov[0] === move[0] && mov[1] >= move[1])
        );
      }
      if (piece.color === "black") {
        moves = moves.filter(
          (mov) => !(mov[0] === move[0] && mov[1] <= move[1])
        );
      }
    }
  });
  return moves;
}

export default Pawn;
export { calculatePawnMoves };
