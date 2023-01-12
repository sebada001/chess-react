import React from "react";

export default function Piece(props) {
  const { board, spot } = props;
  const displayPiece = (spot) => {
    if (spot.piece.image === null || spot.piece.image === undefined)
      return null;
    return (
      <img className="flex h-3/4 basis-0" src={`${spot?.piece.image}`}></img>
    );
  };
  return <div className={`${spot.piece.image}`}>{displayPiece(spot)}</div>;
}
