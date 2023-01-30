import { movesDict } from "../utility/moves_dict";

function inCheck(board, playerColor, playerKing) {
  let keys = Object.keys(board);

  for (let i = 0; i < keys.length; i++) {
    let coord = keys[i];
    let color = board[coord]?.piece?.color;
    if (color && color !== playerColor) {
      let piece = board[coord].piece;
      if (movesDict[piece.type](piece, board).includes(playerKing.coord)) {
        return true;
      }
    }
    continue;
  }
  return false;
}

const checkForChecks = (board, color, king) => {
  let checked = inCheck(board, color, king);
  console.log(`${color} is in check: ${checked}`);
  return checked;
};

export { inCheck, checkForChecks };
