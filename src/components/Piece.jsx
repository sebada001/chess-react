import React from "react";
import { movesDict } from "../utility/moves_dict";
import { moveSafety } from "../moves/in_check";

export default function Piece(props) {
  const {
    board,
    spot,
    highlightSpot,
    setCurrentPiece,
    currentPlayer,
    currentPiece,
    clearHighlights,
    setBoard,
  } = props;

  const highlightMoves = (piece, board) => {
    if (currentPiece?.id === piece.id) {
      if (!Object.keys(board).every((spot) => board[spot].highlight === "")) {
        setBoard(clearHighlights(board));
        return;
      }
    }

    const cleared = clearHighlights(board);
    const moves = movesDict[piece.type](piece, cleared);
    const safeMoves = moveSafety(moves, cleared, piece, currentPlayer); //moves that would not leave your king hanging
    const highlighted = highlightSpot(safeMoves, cleared);

    setBoard(highlighted);
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
