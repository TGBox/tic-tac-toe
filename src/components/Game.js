import React, { useState } from "react";
import { calculateWinner } from "../helper.js"
import Board from "./Board";

const Game = () => {
  // UseState variable setup.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  // Keeping track of the winner by using the helper.js winning function.
  const winner = calculateWinner(history[stepNumber]);
  // Will define which elemnt to draw, based on the xIsNext boolean.
  const xO = xIsNext ? "X" : "O";

  // Function to handle a click event on a square.
  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // Returns if won, or occupied.
    if(winner || squares[i]) {
      return;
    }
    // Selection of the square to draw in.
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  // Will handle the rerendering of the moves within the history.
  const renderMoves = () => 
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  
  // Will handle the iteration of the moves in the renderMoves function.
  const jumpTo = (step) => {
    setStepNumber(step);
    // Will check for even step number to indicate that X is the current player.
    setXisNext(step % 2 === 0);
  };

  // Will handle reset for the game.
  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXisNext(true);
  };

  return (
    <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <Board squares={history[stepNumber]} onClick={handleClick}/>
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        <button id="reset" onClick={resetGame}>Reset Game</button>
      </div>
    </>
  );
};

export default Game;