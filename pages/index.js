import Head from "next/head";
import { useState, useRef, useEffect } from "react";
export default function Home() {
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [firstPlayerScore, setFirstPlayerScore] = useState([]);
  const [secondPlayerScore, setSecondPlayerScore] = useState([]);
  const [cellSelectCount, setCellSelectCount] = useState(0);

  useEffect(() => {
    checkWinner();
  }, [cellSelectCount]);

  const WinnerNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const cell_1 = useRef();
  const cell_2 = useRef();
  const cell_3 = useRef();
  const cell_4 = useRef();
  const cell_5 = useRef();
  const cell_6 = useRef();
  const cell_7 = useRef();
  const cell_8 = useRef();
  const cell_9 = useRef();

  var checkWinner = () => {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 3; j++) {
        if (!firstPlayerScore.includes(WinnerNumbers[i][j])) {
          break;
        } else if (j === 2) {
          setIsFirstPlayerTurn(true);
          setWinner("🎊 Green wins 🎊");
          return;
        }
      }
    }
    if (winner === null) {
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 3; j++) {
          if (!secondPlayerScore.includes(WinnerNumbers[i][j])) {
            break;
          } else if (j === 2) {
            setIsFirstPlayerTurn(false);
            setWinner("🎊 Red wins 🎊");
            return;
          }
        }
      }
    }
    if (cellSelectCount == 9 && winner == null) {
      setWinner("🏳️ Match Draw 🏳️");
      setIsFirstPlayerTurn("Draw");
    }
  };

  var cellSelect = (cellNumber, cellRef) => {
    if (
      cellRef.current.style.backgroundColor != "green" &&
      cellRef.current.style.backgroundColor != "red" &&
      winner === null
    ) {
      if (cellRef.current != null) {
        cellRef.current.style.backgroundColor = isFirstPlayerTurn
          ? "green"
          : "red";
        if (isFirstPlayerTurn) {
          setFirstPlayerScore([...firstPlayerScore, cellNumber]);
        } else {
          setSecondPlayerScore([...secondPlayerScore, cellNumber]);
        }
      }
      setCellSelectCount(cellSelectCount + 1);
      setIsFirstPlayerTurn(!isFirstPlayerTurn);
    }
  };

  var clearBoard = () => {
    cell_1.current.style.backgroundColor = "unset";
    cell_2.current.style.backgroundColor = "unset";
    cell_3.current.style.backgroundColor = "unset";
    cell_4.current.style.backgroundColor = "unset";
    cell_5.current.style.backgroundColor = "unset";
    cell_6.current.style.backgroundColor = "unset";
    cell_7.current.style.backgroundColor = "unset";
    cell_8.current.style.backgroundColor = "unset";
    cell_9.current.style.backgroundColor = "unset";
    setIsFirstPlayerTurn(!isFirstPlayerTurn);
    setFirstPlayerScore([]);
    setSecondPlayerScore([]);
    setWinner(null);
    setCellSelectCount(0);
  };
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <meta
          name="description"
          content="Basic Tic Tac Toe game made by Srujan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="footer">Made by Srujan with React</div>
      <div className="canvas">
        <h1 className="gameName">Tic Tac Toe</h1>
        <div className="turnDisplay">
          {winner ? winner : `Turn: ${isFirstPlayerTurn ? "Green" : "Red"}`}
        </div>
        <div className="board">
          <div className="board__cell" onClick={() => cellSelect(1, cell_1)}>
            <div className="board__marking" ref={cell_1}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(2, cell_2)}>
            <div className="board__marking" ref={cell_2}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(3, cell_3)}>
            <div className="board__marking" ref={cell_3}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(4, cell_4)}>
            <div className="board__marking" ref={cell_4}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(5, cell_5)}>
            <div className="board__marking" ref={cell_5}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(6, cell_6)}>
            <div className="board__marking" ref={cell_6}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(7, cell_7)}>
            <div className="board__marking" ref={cell_7}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(8, cell_8)}>
            <div className="board__marking" ref={cell_8}></div>
          </div>
          <div className="board__cell" onClick={() => cellSelect(9, cell_9)}>
            <div className="board__marking" ref={cell_9}></div>
          </div>
        </div>
        {winner != null ? (
          <div className="newMatchBtn" onClick={() => clearBoard()}>
            New Match
          </div>
        ) : (
          <></>
        )}
      </div>
      <style jsx global>
        {`
          body {
            margin: 0px;
            padding: 0px;
            overflow: hidden;
          }
          .footer {
            width: 100vw;
            padding: 10px 0;
            text-align: center;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            font-weight: bold;
            background-color: #3369ff;
            color: white;
          }
          .canvas {
            background-color: #222;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            width: 100vw;
          }
          .gameName {
            text-align: center;
            margin-top: 10vh;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: min(50px, 10vw);
            color: #eee;
          }
          .turnDisplay {
            background-color: ${isFirstPlayerTurn == "Draw"
              ? "#555"
              : isFirstPlayerTurn
              ? "green"
              : "red"};
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-weight: bold;
            padding: 20px;
            font-size: 20px;
            color: white;
            border-radius: 100px;
            transition: all 0.6s ease-in-out;
            text-align: center;
            margin-bottom: 20px;
            width: min(260px, 90vw);
          }
          .board {
            display: grid;
            border: 2px solid #5c5c5c;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 0px 0px;
            grid-template-areas:
              ". . ."
              ". . ."
              ". . .";
          }
          .board__cell {
            width: 100px;
            height: 100px;
            display: grid;
            place-items: center;
            background-color: #313131;
            border: 2px solid #5c5c5c;
            cursor: pointer;
          }
          .board__marking {
            width: 60px;
            height: 60px;
            padding: 10px;
            border-radius: 100px;
            transition: all 0.2s ease-in-out;
          }
          .newMatchBtn {
            display: inline-block;
            cursor: pointer;
            margin-top: 20px;
             padding: 0.7em 1.4em;
             border-radius: 0.15em;
             box-sizing: border-box;
             text-decoration: none;
             font-family: "Roboto", sans-serif;
             text-transform: uppercase;
             font-weight: 400;
             color: #ffffff;
             background-color: #3369ff;
             box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
             text-align: center;
             position: relative;
            width: min(310px, 90vw);
          }
          .newMatchBtn:active {
             top: 0.1em;
          }
        `}
      </style>
    </>
  );
}
