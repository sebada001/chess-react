import { blackPlayer, whitePlayer } from "../players/player";
import Gameboard from "./Gameboard";
import React, { useState } from "react";
import { checkMate } from "../moves/in_check";

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState(whitePlayer);
  const [eatenPieces, setEatenPieces] = useState([]);
  const [promotion, setPromotion] = useState(false);

  const switchTurns = (board) => {
    let newPlayer =
      currentPlayer.color === "white" ? { ...blackPlayer } : { ...whitePlayer };
    if (checkMate(board, currentPlayer, newPlayer)) {
      alert(
        `Checkmate! ${currentPlayer.color} player wins and ${newPlayer.color} player loses! `
      );
    }
    setCurrentPlayer(newPlayer);
  };

  return (
    <div className="flex flex-col">
      <div className="my-2 flex min-h-[4em] w-[70vh] items-center justify-between">
        <div className="flex grow items-center justify-start">
          {eatenPieces
            .filter((piece) => piece.color === "white")
            .map((p) => {
              return <img src={p.image} className="w-[8%]" key={p.id}></img>;
            })}
        </div>
      </div>
      <Gameboard
        currentPlayer={currentPlayer}
        switchTurns={switchTurns}
        setEatenPieces={setEatenPieces}
        promotion={promotion}
        setPromotion={setPromotion}
      />
      <div className="my-2 flex grow items-center justify-start">
        {eatenPieces
          .filter((piece) => piece.color === "black")
          .map((p) => {
            return <img src={p.image} className="w-[8%]" key={p.id}></img>;
          })}
      </div>
    </div>
  );
}
