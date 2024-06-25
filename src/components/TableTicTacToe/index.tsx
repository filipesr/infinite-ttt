import { useState } from "react";
import "./style.css";

const MAX_HIST = 6;
export interface propsTableTicTacToe {
  initialValues?: string[];
  initialValue?: string;
}
interface propsData {
  values: string[];
  playerSymbol: string;
  hist: number[];
  winner: number[];
}
export const TableTicTacToe = (props: propsTableTicTacToe) => {
  const [data, setData] = useState<propsData>({
    values: props.initialValues ?? ["", "", "", "", "", "", "", "", ""],
    playerSymbol: props.initialValue ?? "X",
    hist: [],
    winner: [],
  });

  const { values, playerSymbol, hist, winner } = data;
  if (winner.length) console.log(`Winner: ${playerSymbol}`);

  const addHist = (index: number, hist: number[]) => {
    if (hist.includes(index)) return hist;
    if (hist.length > MAX_HIST) {
      values[hist[0]] = "";
      hist.shift();
    }
    hist.push(index);
    return hist;
  };

  const handleClick = (index: number) => {
    if (winner.length) return;
    const cellValue = values[index];
    if (cellValue == "") {
      const NewPlayerSymbol = playerSymbol == "X" ? "O" : "X";
      setData(({ values, hist, playerSymbol }) => {
        values[index] = playerSymbol;
        // const NewPlayerSymbol = !checkWin(values, playerSymbol).length ? playerSymbol : newCellValue;
        return {
          values,
          hist: addHist(index, hist),
          playerSymbol: NewPlayerSymbol,
          winner: checkWin(values, playerSymbol),
        };
      });
    }
  };

  const handleReset = () => {
    setData({
      values: ["", "", "", "", "", "", "", "", ""],
      playerSymbol,
      hist: [],
      winner: [],
    });
  };

  console.log(
    hist.length,
    hist[MAX_HIST - 1],
    values[hist[MAX_HIST - 1]],
    hist,
    winner
  );
  const nextHistExclude = hist.length > MAX_HIST ? hist[0] : -1;
  /// verificar a logica do histórico
  return (
    <div className="tttTable noselect">
      {values.map((value, index) => (
        <div
          key={index}
          className={`tttCell tttIndex${index} tttValue${value} ${
            winner?.includes(index) ? ` tttWin${value}` : ""
          } `}
          onClick={() => handleClick(index)}
        >
          <span className={` ${nextHistExclude == index ? " tttLast" : ""}`}>
            {value}
          </span>
        </div>
      ))}
      <div className="tttReset tttCell" onClick={handleReset}>
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
