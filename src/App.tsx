import "./App.css";
import {
  propsTableTicTacToe,
  TableTicTacToe,
} from "./components/TableTicTacToe";

function App() {
  const props: propsTableTicTacToe = {
    // initialValue: ["", "", "", "", "", "", "", "", ""],
  };

  return (
    <>
      <h2>Infinite Tic Tac Toe</h2>
      <div className="card">
        <TableTicTacToe {...props} />
      </div>
    </>
  );
}

export default App;
