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
    playerInCheck,
  } = props;

  const highlightMoves = (piece, board) => {
    if (currentPiece !== piece) {
      clearHighlights(board);
    }
    let moves = movesDict[piece.type](piece, board);
    let safeMoves = moveSafety(moves, board, piece, currentPlayer); //moves that would not leave your king hanging
    // console.log(moves);
    // console.log(safeMoves);
    highlightSpot(safeMoves);
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
