import knight_dark from "../images/Chess_ndt45svg";
import knight_light from "../images/Chess_nlt45svg";

const Knight = (color) => {
  let img = "";
  img = color === "black" ? knight_dark : knight_light;
  const display = () => img;
  return { display };
};

export default Knight;
