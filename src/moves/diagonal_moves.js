import { isMovementLegal, isAttackLegal, isBlocked } from "./move_legality";
import { numericToAlphabetic, alphabeticToNumeric } from "./move_conversion";
import { numbers } from "../utility/gameboard";

const diagonalStep = (coords, dir) => {
  let f = Number(coords[0]);
  let s = Number(coords[1]);
  if (!numbers.includes(s) || !numbers.includes(f)) return coords;
  if (dir === "UR") {
    return `${f + 1}${s + 1}`;
  }
  if (dir === "UL") {
    return `${f - 1}${s + 1}`;
  }
  if (dir === "DR") {
    return `${f + 1}${s - 1}`;
  }
  if (dir === "DL") {
    return `${f - 1}${s - 1}`;
  }
};

function diagonalOpponents(color, type, position, board) {
  let directions = ["UR", "UL", "DR", "DL"];
  let blocked = [];
  let allMoves = [];
  let distance = 8;
  let tempPosition = position;
  if (type === "pawn") {
    distance = 1;
    if (color === "black") {
      directions = ["DR", "DL"];
    }
    if (color === "white") {
      directions = ["UR", "UL"];
    }
  }
  if (type === "king") {
    distance = 1;
  }
  directions.forEach((dir) => {
    for (let i = 0; i < distance; i++) {
      if (blocked.includes(dir)) continue;
      let moveObj = getAttack(dir, tempPosition, board, color);
      let blockedBool = isBlocked(moveObj.move, board, color);
      if (moveObj.legal) {
        blocked.push(dir);
        allMoves.push(moveObj.move);
        tempPosition = position;
      } else {
        blockedBool && blocked.push(dir); //if teammate is on the way, add to blocked array, stop search in that direction
        tempPosition = moveObj.move;
      }
    }
    tempPosition = position;
  });
  return allMoves;
}

function diagonalMoves(color, type, position, board) {
  let directions = ["UR", "UL", "DR", "DL"];
  let blocked = [];
  let allMoves = [];
  let distance = 8;
  let tempPosition = position;
  if (type === "pawn") {
    distance = 1;
    if (color === "black") {
      directions = ["DR", "DL"];
    }
    if (color === "white") {
      directions = ["UR", "UL"];
    }
  }
  if (type === "king") {
    distance = 1;
  }

  directions.forEach((dir) => {
    for (let i = 0; i < distance; i++) {
      if (blocked.includes(dir)) continue;
      let move = getMove(dir, tempPosition, board);
      if (!move) {
        blocked.push(dir);
        tempPosition = position;
        break;
      }
      allMoves.push(move);
      tempPosition = move;
    }
    tempPosition = position;
  });

  return allMoves;
}

function getMove(dir, tempPosition, board) {
  let pos = alphabeticToNumeric(tempPosition);
  let numeric = diagonalStep(pos, dir);
  let move = numericToAlphabetic(numeric);
  if (isMovementLegal(move, board)) {
    return move;
  } else {
    return false;
  }
}
function getAttack(dir, tempPosition, board, color) {
  let pos = alphabeticToNumeric(tempPosition);
  let numeric = diagonalStep(pos, dir);
  let move = numericToAlphabetic(numeric);
  if (isAttackLegal(move, board, color)) {
    return { legal: true, move: move };
  } else {
    return { legal: false, move: move };
  }
}

export { diagonalMoves, diagonalOpponents };
