import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // revisar todas las combinaciones
  // para ver su X u O = gano
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  // revisamos si hay empate
  // si no hay mas espacios vacios en el tablero
  return newBoard.every((square) => square !== null);
  // revisa todo el tablero, si todos son diferntes de null
}
