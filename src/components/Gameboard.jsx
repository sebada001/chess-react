import React, { useState } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";
import classicPlacement from "../utility/classic_chess";
import Piece from "./Piece";

classicPlacement(gameboard);

export default function Gameboard() {
  const [board, setBoard] = useState(gameboard);
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
                  // onClick={() => highlightSpot(coord)}
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
