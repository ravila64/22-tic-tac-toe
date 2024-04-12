import { useState } from 'react'
//import './App.css'
import confetti from "canvas-confetti";

import { TURNS } from './constants.js';
import { Square } from './components/Square.jsx';
import { checkWinnerFrom } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { checkEndGame } from './logic/board.js';

export function App() {
  //const board = Array(9).fill(null);
  const [board, setBoard] = useState(() => {
    const boardFromStotage = window.localStorage.getItem('board');
    if (boardFromStotage) return JSON.parse(boardFromStotage)
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
    
  //null=no hay ganador false=empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    // reset localStorage
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
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

    // guardar aqui partida Y EL TURNO
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

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
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
// export default App
