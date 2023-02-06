import React, { useState } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";
import classicPlacement from "../utility/classic_chess";
import Piece from "./Piece";
import { usePlayerInCheck } from "../hooks/usePlayerInCheck";
import { castlingCheck } from "../moves/check_for_castling";
import { enPassantCheck } from "../moves/check_for_enpassant";

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

    enPassantClear(currentPiece, coord, boardCopy, board);
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

  function enPassantClear(currentPiece, coord, boardCopy, prevBoard) {
    let EP = enPassantCheck(currentPiece, coord, boardCopy, prevBoard);
    if (EP[0]) {
      setEatenPieces((prev) => [...prev, EP[1]]);
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
                      currentBoardMove={currentBoardMove}
                      boardHistory={boardHistory}
                      setBoard={setBoard}
                      spot={spot}
                      highlightSpot={highlightSpot}
                      clearHighlights={clearHighlights}
                      currentPiece={currentPiece}
                      setCurrentPiece={setCurrentPiece}
                      currentPlayer={currentPlayer}
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
