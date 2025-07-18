import { useState } from "react";

function Square({value, onSquareClick}){
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
    {value}
    </button>
  )
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay}) {

  function handleClick(i) {
    console.log('handleclick');

    if(squares[i] || calculateWinner(squares)){ // if place populated already or winner declared return
      return;
    }

    const nextSquares = squares.slice(); // create copy of array

    if(xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares);

    console.log('x is next:', xIsNext);
  }
  
  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return <>
  <div className="status">
    {status}
  </div>
  <div className="board-row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
  </div>
  <div className="board-row">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
  </div>
  <div className="board-row">
    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  </div>
  </>
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  console.log('history', history);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // TODO
    setHistory([...history, nextSquares]); // create new array to contain all items in history
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>todo</ol>
      </div>
    </div>
  )
}