import bishop_dark from "../images/Chess_bdt45.svg";
import bishop_light from "../images/Chess_blt45.svg";

const Bishop = (color, pieceSide, coord) => {
  let img = "";
  img = color === "black" ? bishop_dark : bishop_light;
  const display = () => img;
  const side = () => pieceSide;
  let coordinate = coord;
  const position = (pos) => (coordinate = pos);
  return { display, side, position };
};

export default Bishop;
