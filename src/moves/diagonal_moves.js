import { isLegal } from "./move_legality";
import { numericToAlphabetic, alphabeticToNumeric } from "./move_conversion";

const diagonalStep = (coords, dir) => {
  let f = Number(coords[0]);
  let s = Number(coords[1]);
  if (dir === "UR") {
    return `${f + 1}${s + 1}`;
  }
  if (dir === "UL") {
    return `${f - 1}${s + 1}`;
  }
  if (dir === "DR") {
    console.log("here");
    return `${f + 1}${s - 1}`;
  }
  if (dir === "DL") {
    return `${f - 1}${s - 1}`;
  }
};

function diagonalMoves(color, type, position, board) {
  let directions = ["UR", "UL", "DR", "DL"];
  let blocked = [];
  let allMoves = [];
  let direction = "updown";
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
      if (blocked.includes(direction)) return;
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
  if (isLegal(move, board)) {
    return move;
  } else {
    return false;
  }
}

export { diagonalMoves };
