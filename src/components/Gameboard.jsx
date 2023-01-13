import React, { useState } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";
import classicPlacement from "../utility/classic_chess";
import Piece from "./Piece";

classicPlacement(gameboard);

export default function Gameboard(props) {
  const [board, setBoard] = useState(gameboard);
  const { switchTurns, currentPlayer } = props;
  const [currentPiece, setCurrentPiece] = useState();

  const clearHighlights = () => {
    let boardCopy = { ...board };
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

    let boardCopy = { ...board };
    boardCopy[coord].piece = currentPiece;
    boardCopy[currentPiece.coord].piece = "";
    currentPiece.coord = spot.coord;

    setBoard(boardCopy);
    setCurrentPiece(undefined);
    clearHighlights();
    switchTurns();
  };

  return (
    <div className="gameboard flex h-[30vw] w-[30vw] bg-neutral-100">
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
