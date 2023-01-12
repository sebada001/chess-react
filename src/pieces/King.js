import king_dark from "../images/Chess_kdt45svg";
import king_light from "../images/Chess_klt45svg";

const King = (color) => {
  let img = "";
  img = color === "black" ? king_dark : king_light;
  const display = () => img;
  return { display };
};

export default King;
