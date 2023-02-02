function getAllPieces(board, color) {
  const pieces = [];
  for (let key in board) {
    if (board[key]?.piece && board[key]?.piece.color === color) {
      pieces.push(board[key].piece);
    }
  }
  return pieces;
}
export { getAllPieces };
