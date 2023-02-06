const getRooks = (allPieces) => {
  return allPieces.filter((piece) => piece.type === "rook");
};

export { getRooks };
