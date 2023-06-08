import { useEffect, useState } from "react";
import "./App.css";
import NumberDisplay from "./component/NumberDisplay/NumberDisplay";
import { makeCells,discoverCells } from "./logic/Logic";
import Button from "./component/Button/Button";
import { Cell, cellStatus } from "./types/Types";
import { NUMBER_OF_BOMBS } from "./constant/Constant";
const App = () => {
  const [cells, setCells] = useState(makeCells());
  const [time, setTime] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [flagRemained, setFlagRemained] = useState<number>(NUMBER_OF_BOMBS);

  const handleBomb=()=>{
    //TODO- show all the bombs
    restartBoard();
  }
  const onButtonLeftClick = (cell: Cell) => {
    if (cells[cell.indexRow][cell.indexCol].stat === cellStatus.close ) {
      const newCells=discoverCells(cells,cell.indexRow,cell.indexCol,handleBomb);
      setCells(newCells);
      // let newcells = cells.slice();
      // newcells[cell.indexRow][cell.indexCol] = {
      //   ...cell,
      //   stat: cellStatus.open,
      // };
      // setCells(newcells);
    }
  };

  //puts flag on the cell
  const onButtonRightClick = (
    cell: Cell,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    let newcells = cells.slice();
    if (newcells[cell.indexRow][cell.indexCol].stat !== cellStatus.open) {
      if (newcells[cell.indexRow][cell.indexCol].stat === cellStatus.flagged) {
        newcells[cell.indexRow][cell.indexCol] = {
          ...cell,
          stat: cellStatus.close,
        };
        setFlagRemained(flagRemained + 1);
      } else {
        newcells[cell.indexRow][cell.indexCol] = {
          ...cell,
          stat: cellStatus.flagged,
        };
        setFlagRemained(flagRemained - 1);
      }
      setCells(newcells);
    }
  };

  //timer
  const onFirstClick = () => {
    if (!isLive) {
      setIsLive(true);
    }
  };
  //timer
  useEffect(() => {
    if (isLive) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isLive, time]);

  //make the array cells into Buttons
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) => {
      return row.map((cellObject, colIndex) => (
        <Button
          cell={cellObject}
          onclick={() => onButtonLeftClick(cellObject)}
          onRightClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            onButtonRightClick(cellObject, e)
          }
          key={`${rowIndex},${colIndex}`}
          onFirstClick={onFirstClick}
        />
      ));
    });
  };

  const restartBoard = () => {
    if (isLive) {
      setCells(makeCells());
      renderCells();
      setTime(0);
      setFlagRemained(NUMBER_OF_BOMBS);
      setIsLive(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <NumberDisplay key="flagsLeft" val={flagRemained} />
        <button className="button" onClick={restartBoard}>
          &#x1F33C;
        </button>
        <NumberDisplay key="time" val={time} />
      </div>
      <div className="body">{renderCells()}</div>
    </div>
  );
};

export default App;
