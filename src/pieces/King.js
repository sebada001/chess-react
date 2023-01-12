import king_dark from "../images/Chess_kdt45.svg";
import king_light from "../images/Chess_klt45.svg";

const King = (color, coord) => {
  let img = "";
  img = color === "black" ? king_dark : king_light;
  const display = () => img;
  let coordinate = coord;
  const position = (pos) => (coordinate = pos);
  return { display, position };
};

export default King;
