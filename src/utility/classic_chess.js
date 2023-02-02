import Rook from "../pieces/Rook";
import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";
import Pawn from "../pieces/Pawn";
import King from "../pieces/King";
import Queen from "../pieces/Queen";
import { letters } from "./gameboard";

const classicPlacement = (board) => {
  board["A1"]["piece"] = new Rook("white", "A1");
  board["B1"]["piece"] = new Knight("white", "B1");
  board["C1"]["piece"] = new Bishop("white", "C1");
  board["D1"]["piece"] = new Queen("white", "D1");
  board["E1"]["piece"] = new King("white", "E1");
  // board["F1"]["piece"] = new Bishop("white", "F1");
  // board["G1"]["piece"] = new Knight("white", "G1");
  board["H1"]["piece"] = new Rook("white", "H1");
  letters.forEach((letter) => {
    board[`${letter}2`]["piece"] = new Pawn("white", `${letter}2`);
  });

  board["A8"]["piece"] = new Rook("black", "A8");
  board["B8"]["piece"] = new Knight("black", "B8");
  board["C8"]["piece"] = new Bishop("black", "C8");
  board["C4"]["piece"] = new Queen("black", "C4");
  board["E8"]["piece"] = new King("black", "E8");
  board["F8"]["piece"] = new Bishop("black", "F8");
  board["G8"]["piece"] = new Knight("black", "G8");
  board["H8"]["piece"] = new Rook("black", "H8");
  letters.forEach((letter) => {
    board[`${letter}7`]["piece"] = new Pawn("black", `${letter}7`);
  });
};

export default classicPlacement;
