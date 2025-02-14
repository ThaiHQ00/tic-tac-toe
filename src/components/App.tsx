import React, { useState, ReactElement } from "react";
import Board from "./Board";
import "./App.css";
function App() {
  const [history, setHistory] = useState([{ squares: new Array(9) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [finished, setFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [roundResult, setRoundResult] = useState<string[]>([]);
  const [clearMatchHistory, setclearMatchHistory] = useState(false);

  const handleClick = (i: number) => {
    if (finished) {
      return;
    }
    if (stepNumber >= 9) {
      setFinished(true);
      return;
    }
    const _history = history.slice(0, stepNumber + 1);
    const squares = [..._history[_history.length - 1].squares];
    console.log("history:", _history.length, stepNumber);
    if (squares[i]) {
      return;
    }
    var winner = calculateWinner(squares);
    if (winner) {
      setFinished(true);
      return;
    }

    if (stepNumber == 8 && !winner){
      setDraw(true)
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory([..._history, { squares }]);
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  };

  const _history = [...history];
  const squares = [..._history[stepNumber].squares];
  let winner = calculateWinner(squares);

  const status = draw
  ? "It's a draw"
  : winner
  ? "Winner: " + winner
  : "Next player: " + (xIsNext ? "X" : "O");

  const jumpToStart = () => {
    winner && (xIsNext ? setRoundResult(prevTexts => [...prevTexts, "Winner is: O"])
      : setRoundResult(prevTexts => [...prevTexts, "Winner is: X"])) 

    draw && (setRoundResult(prevTexts => [...prevTexts, "It's a draw"])) 
    
    setStepNumber(0);
    setXIsNext(true);
    setFinished(false);
    setDraw(false)
    winner = ""
    setclearMatchHistory(false)
  };

  const clearHistoryFunction = () => {
    setRoundResult([])
    setDraw(false)
    winner = ""
    setclearMatchHistory(true)
  };
  return (
    <div className="page-layout">

      <div className="game">
        <Board
          squares={squares}
          finished={finished}
          onClick={i => handleClick(i)}
        />
        <div className="game-info">
          <div>{status}</div>

        </div>
        <div className="start-over" onClick={jumpToStart}>
          <div>Start over</div>
        </div>
        <div className="clear-match-result" onClick={clearHistoryFunction}>
          <div>Clear match history</div>
        </div>
      </div>
      <div className="result-history">
        {!clearMatchHistory && (
          <div className="result-cell-layout">
            {roundResult.map((text, index) => (
              <div className="result-cell" key={index}>
                Round {index + 1} - {text}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const length = lines.length;
  for (let i = 0; i < length; i++) {
    const [a, b, c] = lines[i];
    const player = squares[a];
    if (player && player === squares[b] && player === squares[c]) {
      return player;
    }
  }
  return null;
}

export default App;
