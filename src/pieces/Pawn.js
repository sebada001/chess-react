import pawn_dark from "../images/Chess_pdt45.svg";
import pawn_light from "../images/Chess_plt45.svg";

const Pawn = (color) => {
  let img = "";
  img = color === "black" ? pawn_dark : pawn_light;
  const display = () => img;
  return { display };
};

export default Pawn;
