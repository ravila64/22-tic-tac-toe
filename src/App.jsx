import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti";

import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinnerFrom } from './logic/board.js';

export function App() {
  //const board = Array(9).fill(null);
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);
  //null=no hay ganador false=empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay empate
    // si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square !== null);
    // revisa todo el tablero, si todos son diferntes de null
  }

  const updateBoard = (index) => {
    // no actualizamos si es !null, ya tiene algo
    if (board[index] || winner) return;
    // actualizar tablero
    const newBoard = [...board];
    //const newBoard =  structuredClone(board);
    newBoard[index] = turn;  // x o
    setBoard(newBoard);
    console.log("updateBoard - index ", index);
    // cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      //alert(`El ganador es ${newWinner}`);
      confetti();
      setWinner(newWinner); // actualiza el estado
      //actualizacion de estados son asincronos
    } else if (checkEndGame(newBoard)) {
      //todo: check if game is over
      setWinner(false); // empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic tat toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square} {/* estaba board[index] */}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {/* MANEJO DE OTRA SECCION, CON CORCHETES */}
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? "Empate"
                    : "Gano " + winner
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}
// export default App
