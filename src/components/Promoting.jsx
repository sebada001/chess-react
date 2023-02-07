import React from "react";
import queen_light from "../images/Chess_qlt45.svg";
import queen_dark from "../images/Chess_qdt45.svg";
import knight_dark from "../images/Chess_ndt45.svg";
import knight_light from "../images/Chess_nlt45.svg";
import bishop_dark from "../images/Chess_bdt45.svg";
import bishop_light from "../images/Chess_blt45.svg";
import rook_dark from "../images/Chess_rdt45.svg";
import rook_light from "../images/Chess_rlt45.svg";

export default function Promoting(props) {
  const { board, afterPromotion, coords, currentPlayer } = props;

  const handleClick = (e) => {
    afterPromotion(board, e.target.getAttribute("data-type"), coords);
  };

  return (
    <div>
      <div className="absolute left-0 top-0 h-full w-full bg-gray-700 opacity-50"></div>
      <div
        onClick={handleClick}
        className="absolute rounded-sm bg-purple-400 shadow-md shadow-gray-900"
      >
        {currentPlayer.color === "black" && (
          <div className="h-30 flex w-64 flex-row">
            <img src={queen_dark} data-type="queen"></img>
            <img src={knight_dark} data-type="knight"></img>
            <img src={bishop_dark} data-type="bishop"></img>
            <img src={rook_dark} data-type="rook"></img>
          </div>
        )}
        {currentPlayer.color === "white" && (
          <div className="m-6 flex justify-evenly">
            <img src={queen_light} data-type="queen"></img>
            <img src={knight_light} data-type="knight"></img>
            <img src={bishop_light} data-type="bishop"></img>
            <img src={rook_light} data-type="rook"></img>
          </div>
        )}
      </div>
    </div>
  );
}
