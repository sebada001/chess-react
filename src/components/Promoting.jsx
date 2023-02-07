import React from "react";

export default function Promoting(props) {
  const { board, afterPromotion, coords } = props;

  return (
    <div
      onClick={() => afterPromotion(board, "queen", coords)}
      className="h-30 absolute w-64 bg-cyan-300"
    >
      'CHOOSE QUEEN'
    </div>
  );
}
