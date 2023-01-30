function findKing(board, color) {
  let keys = Object.keys(board);
  if (color === "white") {
    return board[
      keys.find(
        (key) =>
          board[key]?.piece.color === "white" &&
          board[key]?.piece.type === "king"
      )
    ].piece;
  }
  if (color === "black") {
    return board[
      keys.find(
        (key) =>
          board[key]?.piece.color === "black" &&
          board[key]?.piece.type === "king"
      )
    ].piece;
  }
}

export { findKing };
