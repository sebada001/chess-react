import { alphabeticToNumeric, numericToAlphabetic } from "./move_conversion";
import { isMovementLegal } from "./move_legality";
import { numbers } from "../utility/gameboard";
import { isAttackLegal, isBlocked } from "./move_legality";

const pawnStart = (coords, dir, board) => {
  let f = coords[0];
  let s = Number(coords[1]);

  if (dir === "UP") {
    if (
      isMovementLegal(`${f}${s + 2}`, board) &&
      isMovementLegal(`${f}${s + 1}`, board)
    ) {
      return `${f}${s + 2}`;
    }
  }
  if (dir === "DOWN") {
    if (
      isMovementLegal(`${f}${s - 2}`, board) &&
      isMovementLegal(`${f}${s - 1}`, board)
    ) {
      return `${f}${s - 2}`;
    }
  }
};

const straightStep = (coords, dir) => {
  let f = Number(coords[0]);
  let s = Number(coords[1]);
  if (!numbers.includes(s) || !numbers.includes(f)) return coords;
  if (dir === "UP") {
    return `${f}${s + 1}`;
  }
  if (dir === "DOWN") {
    return `${f}${s - 1}`;
  }
  if (dir === "LEFT") {
    return `${f - 1}${s}`;
  }
  if (dir === "RIGHT") {
    return `${f + 1}${s}`;
  }
};

function straightMoves(color, type, position, board) {
  let directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  let blocked = [];
  let allMoves = [];
  let distance = 8;
  let tempPosition = position;
  if (type === "pawn") {
    distance = 1;
    if (color === "black") {
      directions = ["DOWN"];
    }
    if (color === "white") {
      directions = ["UP"];
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

function straightOpponents(color, type, position, board) {
  let directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  let blocked = [];
  let allMoves = [];
  let distance = 8;
  let tempPosition = position;
  if (type === "pawn") {
    distance = 1;
    if (color === "black") {
      directions = ["DOWN"];
    }
    if (color === "white") {
      directions = ["UP"];
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

function getMove(dir, tempPosition, board) {
  let pos = alphabeticToNumeric(tempPosition);
  let numeric = straightStep(pos, dir);
  let move = numericToAlphabetic(numeric);
  if (isMovementLegal(move, board)) {
    return move;
  } else {
    return false;
  }
}

function getAttack(dir, tempPosition, board, color) {
  let pos = alphabeticToNumeric(tempPosition);
  let numeric = straightStep(pos, dir);
  let move = numericToAlphabetic(numeric);
  if (isAttackLegal(move, board, color)) {
    return { legal: true, move: move };
  } else {
    return { legal: false, move: move };
  }
}

export { straightMoves, pawnStart, straightOpponents, straightStep };
