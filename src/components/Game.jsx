import { blackPlayer, whitePlayer } from "../players/player";
import Gameboard from "./Gameboard";
import React, { useState } from "react";

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState(whitePlayer);

  const switchTurns = () => {
    let newPlayer =
      currentPlayer.color === "white" ? { ...blackPlayer } : { ...whitePlayer };
    setCurrentPlayer(newPlayer);
  };

  return <Gameboard currentPlayer={currentPlayer} switchTurns={switchTurns} />;
}
