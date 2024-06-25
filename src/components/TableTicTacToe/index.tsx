import { useState } from "react";
import "./style.css";

const MAX_HIST = 6;
export interface propsTableTicTacToe {
  initialValues?: string[];
  initialValue?: string;
}
export const TableTicTacToe = (props: propsTableTicTacToe) => {
  const [values, setValues] = useState(
    props.initialValues ?? ["", "", "", "", "", "", "", "", ""]
  );
  const [value, setValue] = useState(props.initialValue ?? "X");
  const [hist, setHist] = useState<number[]>([]);

  const winner = checkWin(values, value);
  if (winner.length) console.log(`Winner: ${value}`);

  const addHist = (index: number) => {
    setHist((old) => {
      if (old.length < MAX_HIST) return [index, ...old];
      const remIndex = old.pop() || -1;
      setValues((values) => {
        values[remIndex] = "";
        return values;
      });
      return [index, ...old];
    });
  };

  const handleClick = (index: number) => {
    if (winner.length) return;
    const cellValue = values[index];
    if (cellValue == "") {
      const newCellValue = value == "X" ? "O" : "X";
      setValues((old) => {
        old[index] = value;
        if (!checkWin(old, value).length) setValue(newCellValue);
        return old;
      });
      addHist(index);
    }
  };

  const handleReset = () => {
    setValues(["", "", "", "", "", "", "", "", ""]);
    setValue(value == "X" ? "O" : "X");
    setHist([]);
  };

  // console.log(
  //   hist.length,
  //   hist[MAX_HIST - 1],
  //   values[hist[MAX_HIST - 1]],
  //   hist
  // );
  const nextHistExclude = hist.length > MAX_HIST - 1 ? hist[MAX_HIST - 1] : -1;
  /// verificar a logica do histórico
  return (
    <div className="tttTable">
      {values.map((value, index) => (
        <div
          key={index}
          className={`tttCell tttValue${value} ${
            winner?.includes(index) ? ` tttWin${value}` : ""
          } `}
          onClick={() => handleClick(index)}
        >
          <span className={` ${nextHistExclude == index ? " tttLast" : ""}`}>
            {value}
          </span>
        </div>
      ))}
      <div className="tttReset" onClick={handleReset}>
        reset
      </div>
    </div>
  );
};

const checkWin = (game: string[], playerSymbol: string) => {
  if (game.filter((value) => value != "").length < 5) return [];
  const winPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let gameEnded = -1;
  for (let i = 0; i < winPos.length && gameEnded < 0; i++) {
    // console.log(
    //   i,
    //   playerSymbol,
    //   game[winPos[i][0]],
    //   game[winPos[i][1]],
    //   game[winPos[i][2]]
    // );

    gameEnded =
      game[winPos[i][0]] === playerSymbol &&
      game[winPos[i][1]] === playerSymbol &&
      game[winPos[i][2]] === playerSymbol
        ? i
        : -1;
  }

  return gameEnded >= 0 ? winPos[gameEnded] : [];
};
