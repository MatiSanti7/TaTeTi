import { useState } from "react";
import "./App.css";

function App() {
  const [isTurn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [result, setResult] = useState("");
  const [win, setWin] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleClick = (index) => {
    if (!board[index] && !result) {
      const newBoard = [...board];
      newBoard[index] = isTurn ? "❌" : "⚪";
      setBoard(newBoard);
      setTurn(!isTurn);
      if (checkWinner(newBoard, isTurn ? "❌" : "⚪"));
    }
  };

  const isBoardFull = () => {
    let countEmptyCells = 0;
    for (let cell of board) {
      if (cell === null) {
        countEmptyCells++;
      }
    }
    return countEmptyCells === 1;
  };

  const checkWinner = (board, player) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setResult(`Ganó!`);
        setWin(player);
        setShowResult(true);
        return;
      }
      if (isBoardFull()) {
        setResult("¡Empate!");
        setWin("");
        setShowResult(true);
      }
    }
  };

  let classTurn1 = `grid text-6xl rounded-lg w-28 h-28 place-content-center ${
    isTurn ? "turn" : "notTurn"
  }`;
  let classTurn2 = `grid text-6xl rounded-lg w-28 h-28 place-content-center ${
    isTurn ? "notTurn" : "turn"
  }`;

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setResult(null);
    setShowResult(false);
  };

  return (
    <main className="relative bg-[#242424] h-screen grid place-content-center">
      <div
        className={`flex flex-col items-center ${showResult ? "blur-md" : ""}`}
      >
        <h1 className="text-[#FFFFFF] font-extrabold text-8xl">TA TE TI</h1>
        <button
          className="text-2xl text-[#FFFFFF] p-2 px-8 mt-16 mb-5 border-[#FFFFFF] border-2 rounded-lg hover:bg-[#FFFFFF] hover:text-[#242424] "
          onClick={restartGame}
        >
          Reiniciar
        </button>
        <div id="board" className="grid grid-cols-3 gap-5">
          {board.map((symbol, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="cursor-pointer w-32 h-32 border-[#FFFFFF] border-2 rounded-lg grid place-content-center text-7xl"
            >
              {symbol}
            </div>
          ))}
        </div>
        <div className="flex gap-10 mt-16">
          <span id="cross" className={classTurn1}>
            ❌
          </span>
          <span id="circle" className={classTurn2}>
            ⚪
          </span>
        </div>
      </div>

      {result && (
        <div className={`absolute inset-0 ${showResult ? "" : "hidden"}`}>
          <div className="bg-[#242424] w-full h-screen bg-opacity-50 grid place-content-center">
            <div className="bg-[#242424] border-[#FFFFFF] border-2 rounded-lg w-[450px] flex flex-col items-center p-7">
              <strong className="text-[#FFFFFF] font-medium text-3xl pb-7">
                {result}
                {isBoardFull() && <p>¡Empate!</p>}
              </strong>
              <span
                id="circle"
                className="grid text-6xl rounded-lg border-[#FFFFFF] border-2 w-28 h-28 place-content-center"
              >
                {win}
              </span>
              <button
                className="text-2xl text-[#FFFFFF] p-2 px-8 border-[#FFFFFF] border-2 rounded-lg hover:bg-[#FFFFFF] hover:text-[#242424] mt-10"
                onClick={restartGame}
              >
                Empezar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
