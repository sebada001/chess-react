function Player(color) {
  this.color = color;
  this.direction = this.color === "black" ? "down" : "up";
  this.castling = true;
}
const whitePlayer = new Player("white");
const blackPlayer = new Player("black");
export { whitePlayer, blackPlayer };
