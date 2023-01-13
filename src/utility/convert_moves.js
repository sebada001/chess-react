import { letters, numbers } from "./gameboard";

function convertMoves(coords, conversion) {
  let currentIndex = letters.findIndex((e) => e === coords[0]);
  let newIndexLetter = letters[currentIndex + conversion[0]] ?? null;
  let newIndexNumber = numbers[conversion[1] + Number(coords[1]) - 1] ?? null;
  if (newIndexLetter && newIndexNumber)
    return `${newIndexLetter}${newIndexNumber}`;
}

export { convertMoves };
