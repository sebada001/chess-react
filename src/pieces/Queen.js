import queen_dark from "../images/Chess_qdt45.svg";
import queen_light from "../images/Chess_qlt45.svg";

const Queen = (color) => {
  let img = "";
  img = color === "black" ? queen_dark : queen_light;
  const display = () => img;
  return { display };
};

export default Queen;
