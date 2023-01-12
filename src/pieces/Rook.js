import rook_dark from "../images/Chess_rdt45.svg";
import rook_light from "../images/Chess_rlt45.svg";

const Rook = (color) => {
  let img = "";
  img = color === "black" ? rook_dark : rook_light;
  const display = () => img;
  return { display };
};

export default Rook;
