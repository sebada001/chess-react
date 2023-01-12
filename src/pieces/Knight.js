import knight_dark from "../images/Chess_ndt45.svg";
import knight_light from "../images/Chess_nlt45.svg";

const Knight = (color, pieceSide, coord) => {
  let img = "";
  img = color === "black" ? knight_dark : knight_light;
  const display = () => img;
  const side = () => pieceSide;
  let coordinate = coord;
  const position = (pos) => (coordinate = pos);
  return { display, side, position };
};

export default Knight;
