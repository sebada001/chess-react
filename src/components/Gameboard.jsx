import React, { useState, useEffect } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";
import classicPlacement from "../utility/classic_chess";
import Piece from "./Piece";
import { checkForChecks } from "../moves/in_check";
import { findKing } from "../utility/find_king";

classicPlacement(gameboard);

export default function Gameboard(props) {
  const [board, setBoard] = useState(gameboard);
  const { switchTurns, currentPlayer, setEatenPieces } = props;
  const [currentPiece, setCurrentPiece] = useState();
  const [playerInCheck, setPlayerInCheck] = useState("");

  const whiteKing = findKing(board, "white");
  const blackKing = findKing(board, "black");

  useEffect(() => {
    if (currentPlayer.color === "white") {
      if (checkForChecks(board, whiteKing.color, whiteKing)) {
        setPlayerInCheck("white");
      } else {
        setPlayerInCheck("");
      }
    } else {
      if (checkForChecks(board, blackKing.color, blackKing)) {
        setPlayerInCheck("black");
      } else {
        setPlayerInCheck("");
      }
    }
  }, [currentPlayer]);

  const clearHighlights = (boardCopy) => {
    for (let key in boardCopy) {
      boardCopy[key].highlight = "";
    }
    setBoard(boardCopy);
  };

  const highlightSpot = (coords) => {
    let boardCopy = { ...board };
    coords.forEach((coord) => {
      let spotCopy = { ...board[coord] };
      spotCopy.highlight = spotCopy.highlight === "" ? "highlight" : "";
      boardCopy[coord] = spotCopy;
    });
    setBoard(boardCopy);
  };

  const makeMove = (spot, coord) => {
    if (currentPiece === undefined) return;
    if (spot.highlight !== "highlight") return;

    let boardCopy = {};
    for (let key in board) {
      boardCopy[key] = { ...board[key] };
    }
    if (boardCopy[coord].piece !== "") {
      setEatenPieces((prev) => [...prev, boardCopy[coord].piece]);
    }
    boardCopy[coord].piece = currentPiece;
    boardCopy[currentPiece.coord].piece = "";

    currentPiece.coord = spot.coord;
    currentPiece.startingPosition = false;

    setBoard(boardCopy);
    setCurrentPiece(undefined);
    switchTurns(boardCopy);
    clearHighlights(boardCopy);
  };

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
