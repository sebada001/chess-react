import { blackPlayer, whitePlayer } from "../players/player";
import Gameboard from "./Gameboard";
import React, { useState } from "react";

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState(whitePlayer);
  const [eatenPieces, setEatenPieces] = useState([]);

  const switchTurns = () => {
    let newPlayer =
      currentPlayer.color === "white" ? { ...blackPlayer } : { ...whitePlayer };
    setCurrentPlayer(newPlayer);
  };

  return (
    <div className="flex flex-col">
      <div className="my-2 flex min-h-[4em] w-[70vh] items-center justify-between">
        <div className="flex grow items-center justify-start">
          {eatenPieces
            .filter((pie) => pie.color === "white")
            .map((p) => {
              return <img src={p.image} className="w-[8%]"></img>;
            })}
        </div>
      </div>
      <Gameboard
        currentPlayer={currentPlayer}
        switchTurns={switchTurns}
        setEatenPieces={setEatenPieces}
      />
      <div className="my-2 flex grow items-center justify-start">
        {eatenPieces
          .filter((pie) => pie.color === "black")
          .map((p) => {
            return <img src={p.image} className="w-[8%]"></img>;
          })}
      </div>
    </div>
  );
}
