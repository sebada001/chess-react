import React, { useState, useEffect } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";
import classicPlacement from "../utility/classic_chess";
import Piece from "./Piece";
import { findKing } from "../utility/find_king";
import { usePlayerInCheck } from "../hooks/usePlayerInCheck";
import { checkForCastling } from "../moves/check_for_castling";

classicPlacement(gameboard);

export default function Gameboard(props) {
  const [boardHistory, setBoardHistory] = useState([gameboard]);
  const [currentBoardMove, setCurrentBoardMove] = useState(0);
  const [board, setBoard] = useState(gameboard);
  const { switchTurns, currentPlayer, setEatenPieces } = props;
  const [currentPiece, setCurrentPiece] = useState();
  const playerInCheck = usePlayerInCheck(currentPlayer, board);

  const clearHighlights = (board) => {
    let boardCopy = structuredClone(board);
    for (let key in boardCopy) {
      boardCopy[key].highlight = "";
    }
    return boardCopy;
  };

  const highlightSpot = (coords, board) => {
    let boardCopy = structuredClone(board);
    coords.forEach((coord) => {
      let spotCopy = structuredClone(boardCopy[coord]);
      spotCopy.highlight = spotCopy.highlight === "" ? "highlight" : "";
      boardCopy[coord] = spotCopy;
    });
    return boardCopy;
  };

  const makeMove = (spot, coord) => {
    if (currentPiece === undefined) return;
    if (spot.highlight !== "highlight") return;

    let boardCopy = structuredClone(board);

    if (boardCopy[coord].piece !== "") {
      setEatenPieces((prev) => [...prev, boardCopy[coord].piece]);
    }
    boardCopy[coord].piece = currentPiece;
    boardCopy[currentPiece.coord].piece = "";

    currentPiece.coord = spot.coord;
    castlingCheck(currentPiece, boardCopy);
    currentPiece.startingPosition = false;

    const clearedHighlights = clearHighlights(boardCopy);

    setBoardHistory((curr) => [...curr, board]);
    setBoard(clearedHighlights);
    setCurrentBoardMove((curr) => curr + 1);
    setCurrentPiece(undefined);
    switchTurns(boardCopy);
  };

  function castlingCheck(piece, boardCopy) {
    const checkCastling = checkForCastling(piece);
    if (checkCastling[0]) {
      boardCopy[checkCastling[2]].piece = boardCopy[checkCastling[1]].piece;
      boardCopy[checkCastling[1]].piece = "";
      boardCopy[checkCastling[2]].piece.startingPosition = false;
      boardCopy[checkCastling[2]].piece.coord = checkCastling[2];
    }
  }

  return (
    <div className="gameboard flex h-[70vh] w-[70vh] bg-neutral-100">
      {boardArrays.map((arr, ind) => {
        return (
          <div
            className={`columns flex grow basis-0 flex-col bg-violet-400/10`}
            key={`container-${ind}`}
          >
            {arr.map((coord) => {
              const spot = board[coord];
              return (
                <div
                  onClick={() => makeMove(spot, coord)}
                  key={spot.id}
                  className={`${coord} rows flex grow basis-0 flex-row items-center justify-center custom-bg-${spot.color} ${spot.highlight}`}
                >
                  {spot?.piece && (
                    <Piece
                      board={board}
                      setBoard={setBoard}
                      spot={spot}
                      highlightSpot={highlightSpot}
                      clearHighlights={clearHighlights}
                      currentPiece={currentPiece}
                      setCurrentPiece={setCurrentPiece}
                      currentPlayer={currentPlayer}
                      playerInCheck={playerInCheck}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
