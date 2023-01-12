import pawn_dark from "../images/Chess_pdt45.svg";
import pawn_light from "../images/Chess_plt45.svg";

const Pawn = (color, coord) => {
  let img = "";
  let coordinate = coord;
  img = color === "black" ? pawn_dark : pawn_light;
  const display = () => img;
  const position = (pos) => (coordinate = pos);
  const moves = () => {
    let arrOfMoves = [];
    if (color === "white") {
      arrOfMoves.push(`${coordinate[0]}${coordinate[1] + 1}`);
      if (coordinate[1] === 2) {
        arrOfMoves.push(`${coordinate[0]}${coordinate[1] + 2}`);
      }
    }
    if (color === "black") {
      arrOfMoves.push(`${coordinate[0]}${coordinate[1] - 1}`);
      if (coordinate[1] === 2) {
        arrOfMoves.push(`${coordinate[0]}${coordinate[1] - 2}`);
      }
    }
    return arrOfMoves;
  };
  return { display, position };
};

export default Pawn;
