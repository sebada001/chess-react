import React from "react";
import { movesDict } from "../utility/moves_dict";
import { moveSafety } from "../moves/in_check";
import { checkForEnPassant } from "../moves/check_for_enpassant";

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
    boardHistory,
    currentBoardMove,
  } = props;

  const highlightMoves = (piece, board) => {
    if (currentPiece?.id === piece.id) {
      if (!Object.keys(board).every((spot) => board[spot].highlight === "")) {
        setBoard(clearHighlights(board));
        return;
      }
    }

    const cleared = clearHighlights(board);

    let moves;
    if (piece.type === "king") {
      // only if king check for castling, helps performance
      moves = movesDict[piece.type](piece, cleared, true);
    } else {
      moves = movesDict[piece.type](piece, cleared);
    }
    if (piece.type === "pawn") {
      let EP = checkForEnPassant(piece, board, boardHistory[currentBoardMove]);
      if (EP[0]) {
        moves.push(EP[1]);
      }
    }

    const safeMoves = moveSafety(moves, cleared, piece, currentPlayer.color);
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
