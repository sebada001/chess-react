import { useState, useEffect } from "react";
import { checkForChecks } from "../moves/in_check";
import { findKing } from "../utility/find_king";

function usePlayerInCheck(currentPlayer, board) {
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

  return playerInCheck;
}

export { usePlayerInCheck };
