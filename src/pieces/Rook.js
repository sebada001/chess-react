import rook_dark from "../images/Chess_rdt45.svg";
import rook_light from "../images/Chess_rlt45.svg";
import { nanoid } from "nanoid";

// const Rook = (color, pieceSide, coord) => {
//   let img = "";
//   img = color === "black" ? rook_dark : rook_light;
//   const display = () => img;
//   const side = () => pieceSide;
//   let coordinate = coord;
//   const position = (pos) => (coordinate = pos);
//   return { display, side, position };
// };

function Rook(color, coord) {
  this.color = color;
  this.coord = coord;
  this.image = color === "black" ? rook_dark : rook_light;
  this.id = nanoid();
}

export default Rook;
