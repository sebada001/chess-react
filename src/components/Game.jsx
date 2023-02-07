import { blackPlayer, whitePlayer } from "../players/player";
import Gameboard from "./Gameboard";
import React, { useState } from "react";
import { checkMate } from "../moves/in_check";
import gameboard from "../utility/gameboard";

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState(whitePlayer);
  const [eatenPieces, setEatenPieces] = useState([]);
  const [promotion, setPromotion] = useState(false);
  const [checkMateStatus, setCheckMateStatus] = useState(false);
  const [winner, setWinner] = useState("");
  let gameboardVar = gameboard();

  const switchTurns = (board) => {
    let newPlayer =
      currentPlayer.color === "white" ? { ...blackPlayer } : { ...whitePlayer };
    if (checkMate(board, currentPlayer, newPlayer)) {
      setWinner(currentPlayer.color);
      setCheckMateStatus(true);
    }
    setCurrentPlayer(newPlayer);
  };

  const handleRestart = () => {
    gameboardVar = gameboard();
    setWinner("");
    setCurrentPlayer(whitePlayer);
    setEatenPieces([]);
    setCheckMateStatus(false);
  };

  return (
    <div className="flex flex-col">
      {(!checkMateStatus && (
        <div className="flex flex-col items-center justify-between ">
          <div className="my-2 flex min-h-[4em] w-[70vh] items-center justify-between">
            <div className="flex grow items-center justify-start">
              {eatenPieces
                .filter((piece) => piece.color === "white")
                .map((p) => {
                  return (
                    <img
                      src={p.image}
                      className="w-[8%] animate-pulse"
                      key={p.id}
                    ></img>
                  );
                })}
            </div>
          </div>
          {
            <Gameboard
              gameboard={gameboardVar}
              currentPlayer={currentPlayer}
              switchTurns={switchTurns}
              setEatenPieces={setEatenPieces}
              promotion={promotion}
              setPromotion={setPromotion}
            />
          }
          <div className="my-2 flex grow items-center justify-start">
            {eatenPieces
              .filter((piece) => piece.color === "black")
              .map((p) => {
                return (
                  <img
                    src={p.image}
                    className="w-[8%] animate-pulse"
                    key={p.id}
                  ></img>
                );
              })}
          </div>
        </div>
      )) || (
        <div
          className="my-40 animate-bounce cursor-pointer rounded-md p-6 text-lg text-white shadow-sm shadow-slate-500"
          onClick={handleRestart}
        >
          {winner} wins... another game?
        </div>
      )}
    </div>
  );
}
