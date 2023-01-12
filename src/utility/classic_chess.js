import Rook from "../pieces/Rook";
import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";
import Pawn from "../pieces/Pawn";
import King from "../pieces/King";
import Queen from "../pieces/Queen";
import { letters } from "./gameboard";

const classicPlacement = (board) => {
  board["A1"].place(Rook("white", "left", "A1"));
  board["B1"].place(Knight("white", "left", "B1"));
  board["C1"].place(Bishop("white", "left", "C1"));
  board["D1"].place(Queen("white", "D1"));
  board["E1"].place(King("white", "E1"));
  board["F1"].place(Bishop("white", "right", "F1"));
  board["G1"].place(Knight("white", "right", "G1"));
  board["H1"].place(Rook("white", "right", "H1"));
  letters.forEach((letter) => {
    board[`${letter}2`].place(Pawn("white"));
  });

  board["A8"].place(Rook("black", "left", "A8"));
  board["B8"].place(Knight("black", "left", "B8"));
  board["C8"].place(Bishop("black", "left", "C8"));
  board["D8"].place(Queen("black", "D8"));
  board["E8"].place(King("black", "E8"));
  board["F8"].place(Bishop("black", "right", "F8"));
  board["G8"].place(Knight("black", "right", "G8"));
  board["H8"].place(Rook("black", "right", "H8"));
  letters.forEach((letter) => {
    board[`${letter}7`].place(Pawn("black"));
  });
};

export default classicPlacement;
