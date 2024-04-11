import { useState } from 'react'
import './App.css'
const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index })=>{
  const className=`square ${isSelected ? 'is-selected':''}` ;
  const handleClick = () =>{
    updateBoard(index);
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


function App() {
  //const board = Array(9).fill(null);
  const [board, setBoard]= useState(Array(9).fill(null));
  
  const [turn, setTurn] = useState(TURNS.X);
  //null=no hay ganador false=empate
  const [winner, setWinner ] = useState(null); 

  const updateBoard = (index) =>{
    // no actualizamos si es !null, ya tiene algo
    if (board[index]) return;
    
    // actualizar tablero
    const newBoard = [... board];
    //const newBoard =  structuredClone(board);
    newBoard[index]=turn;  // x o
    setBoard(newBoard);
    console.log("updateBoard - index ", index);
    // cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }

  return (
    <main className='board'>
      <h1>Tic tat toe</h1>
      <section className='game'>
      {
        board.map((square, index)=>{
          return(
           <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>

      <section className='turn'>
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}
export default App
