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
    console.log(e.target);
    afterPromotion(board, e.target.getAttribute("data-type"), coords);
  };

  return (
    <div onClick={handleClick} className="h-30 absolute w-64 bg-cyan-300">
      {currentPlayer.color === "black" && (
        <div>
          <img src={queen_dark} data-type="queen"></img>
          <img src={knight_dark} data-type="knight"></img>
          <img src={bishop_dark} data-type="bishop"></img>
          <img src={rook_dark} data-type="rook"></img>
        </div>
      )}
      {currentPlayer.color === "white" && (
        <div>
          <img src={queen_light} data-type="queen"></img>
          <img src={knight_light} data-type="knight"></img>
          <img src={bishop_light} data-type="bishop"></img>
          <img src={rook_light} data-type="rook"></img>
        </div>
      )}
    </div>
  );
}
