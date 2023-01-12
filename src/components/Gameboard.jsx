import React, { useState } from "react";
import gameboard, { boardArrays } from "../utility/gameboard";

export default function Gameboard() {
  const [board, setBoard] = useState(gameboard);

  return (
    <div className="gameboard flex h-[30vw] w-[30vw] bg-neutral-100">
      {boardArrays.map((arr, ind) => {
        return (
          <div
            className="columns flex grow flex-col bg-violet-400/10"
            key={`container-${ind}`}
          >
            {arr.map((coord) => {
              return (
                <div
                  key={board[coord].id()}
                  className={`rows flex grow flex-row custom-bg-${board[
                    coord
                  ].color()}`}
                >
                  {`${board[coord].piece() ?? ""}`}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
