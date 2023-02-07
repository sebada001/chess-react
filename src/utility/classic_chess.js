import Rook from "../pieces/Rook";
import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";
import Pawn from "../pieces/Pawn";
import King from "../pieces/King";
import Queen from "../pieces/Queen";
import { letters } from "./gameboard";

const classicPlacement = (board) => {
  const clone = structuredClone(board);
  clone["A1"]["piece"] = new Rook("white", "A1");
  clone["B1"]["piece"] = new Knight("white", "B1");
  clone["C1"]["piece"] = new Bishop("white", "C1");
  clone["D1"]["piece"] = new Queen("white", "D1");
  clone["E1"]["piece"] = new King("white", "E1");
  clone["F1"]["piece"] = new Bishop("white", "F1");
  clone["G1"]["piece"] = new Knight("white", "G1");
  clone["H1"]["piece"] = new Rook("white", "H1");
  letters.forEach((letter) => {
    clone[`${letter}2`]["piece"] = new Pawn("white", `${letter}2`);
  });

  clone["A8"]["piece"] = new Rook("black", "A8");
  clone["B8"]["piece"] = new Knight("black", "B8");
  clone["C8"]["piece"] = new Bishop("black", "C8");
  clone["D8"]["piece"] = new Queen("black", "D8");
  clone["E8"]["piece"] = new King("black", "E8");
  clone["F8"]["piece"] = new Bishop("black", "F8");
  clone["G8"]["piece"] = new Knight("black", "G8");
  clone["H8"]["piece"] = new Rook("black", "H8");
  letters.forEach((letter) => {
    clone[`${letter}7`]["piece"] = new Pawn("black", `${letter}7`);
  });
  return clone;
};

export default classicPlacement;
