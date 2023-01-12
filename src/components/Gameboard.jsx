import React, { useState } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";
import classicPlacement from "../utility/classic_chess";
import Pawn from "../pieces/Pawn";

const displayPiece = (spot) => {
  if (spot?.piece() === null) return null;
  return (
    <img
      className="flex h-3/4 basis-0"
      src={`${spot?.piece().display()}`}
    ></img>
  );
};

classicPlacement(gameboard);

export default function Gameboard() {
  const [board, setBoard] = useState(gameboard);
  //   function setter() {
  //     setBoard((prev) => {
  //       let copy = { ...board["A1"] };
  //       copy.place(Pawn("white"));
  //       return { ...prev, copy };
  //     });
  //   }

  return (
    <div className="gameboard flex h-[30vw] w-[30vw] bg-neutral-100">
      {boardArrays.map((arr, ind) => {
        return (
          <div
            className="columns flex grow basis-0 flex-col bg-violet-400/10"
            key={`container-${ind}`}
          >
            {arr.map((coord) => {
              return (
                <div
                  key={board[coord].id()}
                  className={`${coord} rows flex grow basis-0 flex-row items-center justify-center custom-bg-${board[
                    coord
                  ].color()}`}
                >
                  {displayPiece(board[coord])}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
