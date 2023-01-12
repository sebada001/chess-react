import bishop_dark from "../images/Chess_bdt45.svg";
import bishop_light from "../images/Chess_blt45.svg";

const Bishop = (color) => {
  let img = "";
  img = color === "black" ? bishop_dark : bishop_light;
  const display = () => img;
  return { display };
};

export default Bishop;
