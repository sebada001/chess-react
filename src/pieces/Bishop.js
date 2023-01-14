import bishop_dark from "../images/Chess_bdt45.svg";
import bishop_light from "../images/Chess_blt45.svg";
import { numbers } from "../utility/gameboard";
import { convertMoves } from "../utility/convert_moves";
import { lettersToNumbers } from "../utility/gameboard";

function Bishop(color, coord) {
  this.type = "bishop";
  this.color = color;
  this.coord = coord;
  this.image = color === "black" ? bishop_dark : bishop_light;
  this.direction = this.color === "black" ? "down" : "up";
  this.moves = moves;
  this.startingPosition = true;
}

let negatives = [-1, -2, -3, -4, -5, -6, -7];
let positives = numbers.slice(0, -1);

let diagonals = [];

function getDiagonals(arr1, arr2) {
  const list = [];
  arr1.forEach((a) => {
    arr1.forEach((b) => {
      if (Math.abs(a) === Math.abs(b)) {
        list.push([a, b]);
      }
    });
  });
  arr1.forEach((a) => {
    arr2.forEach((b) => {
      if (Math.abs(a) === Math.abs(b)) {
        list.push([a, b]);
      }
    });
  });
  arr2.forEach((a) => {
    arr2.forEach((b) => {
      if (Math.abs(a) === Math.abs(b)) {
        list.push([a, b]);
      }
    });
  });
  arr2.forEach((a) => {
    arr1.forEach((b) => {
      if (Math.abs(a) === Math.abs(b)) {
        list.push([a, b]);
      }
    });
  });
  return list;
}
diagonals = getDiagonals(positives, negatives);

const moves = {
  move: diagonals,
};

function calculateBishopMoves(piece, board) {
  let allMoves = [];
  let movements = [];
  let pieceMoves = piece.moves;

  //movements
  pieceMoves["move"].forEach((move) =>
    movements.push(convertMoves(piece.coord, move))
  );
  movements = movements.filter((move) => !(move === undefined));
  cleanObstaclesDiagonals(board, movements, piece, board).forEach((move) =>
    allMoves.push(move)
  );

  return allMoves;
}

// function friendlyFire(board, moves, piece) {
//   return moves.filter((move) => board[move].piece?.color !== piece.color);
// }

function cleanObstaclesDiagonals(board, moves, piece) {
  let blockSpots = [];
  let enemies = [];
  let enemiesFirst = [];
  moves.forEach((move) => {
    if (board[move].piece !== "") {
      moves = moves.filter((mov) => {
        if (isBlockedDiagonal(mov, move)) {
          blockSpots.push(mov);
        }
        return !isBlockedDiagonal(mov, move);
      });
    }
  });
  blockSpots.map((block) => {
    if (board[block].piece.color !== piece.color) {
      enemies.push(block);
      if (
        enemies.every(
          (en) =>
            !isBehindBlocked(
              lettersToNumbers(block),
              lettersToNumbers(en),
              lettersToNumbers(piece.coord)
            )
        )
      ) {
        enemiesFirst.push(block);
      }
    }
  });

  blockSpots.forEach((block) => {
    moves = moves.filter(
      (move) =>
        !isBehindBlocked(
          lettersToNumbers(move),
          lettersToNumbers(block),
          lettersToNumbers(piece.coord)
        )
    );
  });

  return [...moves, ...enemiesFirst];
}

function isBlockedDiagonal(move1, move2) {
  if (move1[0] === move2[0] && move1[1] === move2[1]) {
    return true;
  }
  return false;
}

function isBehindBlocked(move, block, piecePosition) {
  if (block[0] > piecePosition[0] && block[1] > piecePosition[1]) {
    if (move[0] > block[0] && move[1] > block[1]) return true;
  }
  if (block[0] > piecePosition[0] && block[1] < piecePosition[1]) {
    if (move[0] > block[0] && move[1] < block[1]) return true;
  }
  if (block[0] < piecePosition[0] && block[1] > piecePosition[1]) {
    if (move[0] < block[0] && move[1] > block[1]) return true;
  }
  if (block[0] < piecePosition[0] && block[1] < piecePosition[1]) {
    if (move[0] < block[0] && move[1] < block[1]) return true;
  }
  return false;
}

export default Bishop;
export { calculateBishopMoves };
