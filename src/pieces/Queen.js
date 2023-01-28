import queen_dark from "../images/Chess_qdt45.svg";
import queen_light from "../images/Chess_qlt45.svg";
import { nanoid } from "nanoid";

// const Queen = (color, coord) => {
//   let img = "";
//   img = color === "black" ? queen_dark : queen_light;
//   const display = () => img;
//   let coordinate = coord;
//   const position = (pos) => (coordinate = pos);
//   return { display, position };
// };
function Queen(color, coord) {
  this.color = color;
  this.coord = coord;
  this.image = color === "black" ? queen_dark : queen_light;
  this.id = nanoid();
}

export default Queen;
