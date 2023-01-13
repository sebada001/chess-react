import React from "react";
import { calculateMoves } from "../pieces/Pawn";

export default function Piece(props) {
  const {
    board,
    spot,
    highlightSpot,
    clearHighlights,
    currentPiece,
    setCurrentPiece,
    currentPlayer,
  } = props;

  const highlightMoves = (piece, board) => {
    if (currentPiece !== piece) {
      clearHighlights();
    }
    let moves = calculateMoves[piece.type](piece, board);
    highlightSpot(moves);
  };
  const handlePlay = (piece) => {
    if (piece.color !== currentPlayer.color) return;
    setCurrentPiece(piece);
    highlightMoves(piece, board);
  };

  return (
    <div className={`${spot.piece.image}`}>
      {
        <img
          className="flex w-[4.5rem]"
          src={`${spot.piece.image}`}
          onClick={() => handlePlay(spot.piece, board)}
        ></img>
      }
    </div>
  );
}
