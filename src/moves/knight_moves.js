import { alphabeticToNumeric, numericToAlphabetic } from "./move_conversion";
import { isAttackLegal, isMovementLegal } from "./move_legality";

const lSteps = (coords, board, color) => {
  const allMoves = [];
  let numeric = alphabeticToNumeric(coords);
  let f = Number(numeric[0]);
  let s = Number(numeric[1]);

  seriesOfL.forEach((coord) => {
    let attempt = `${coord[0] + f}${coord[1] + s}`;
    if (isMovementLegal(attempt, board) || isAttackLegal(attempt, board, color))
      allMoves.push(numericToAlphabetic(attempt));
  });

  return allMoves;
};

const seriesOfL = [
  [2, 1],
  [2, -1],
  [1, 2],
  [1, -2],
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
];

export default lSteps;
