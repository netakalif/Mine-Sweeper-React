import { useEffect, useState } from "react";
import "./App.css";
import NumberDisplay from "./component/NumberDisplay/NumberDisplay";
import { makeCells, discoverCells, openAllBombs } from "./logic/Logic";
import Button from "./component/Button/Button";
import { Cell, cellStatus } from "./types/Types";
import { NUMBER_OF_BOMBS, NUMBER_OF_ROWS } from "./constant/Constant";
const App = () => {
  
  const [cells, setCells] = useState(makeCells());
  const [time, setTime] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [flagRemained, setFlagRemained] = useState<number>(NUMBER_OF_BOMBS);

  const handleBomb = () => {
    openAllBombs(cells);
    restartBoard();
  };

  const onButtonLeftClick = (cell: Cell) => {
    if (cells[cell.indexRow][cell.indexCol].stat === cellStatus.close) {
      const newCells = discoverCells(
        cells,
        cell.indexRow,
        cell.indexCol,
        handleBomb
      );
      setCells(newCells);
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
    if(time===999) restartBoard();
    else if (isLive) {
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
    console.log("reset");
    const freshCells = makeCells();
    setCells(freshCells);
    console.log("made cells");
    renderCells();
    setTime(0);
    setFlagRemained(NUMBER_OF_BOMBS);
    setIsLive(false);
  };

  return (
    <div className="App">
      <div className="header">
        <NumberDisplay key="flagsLeft" val={flagRemained} />
        <button className="button" id="reset" onClick={restartBoard}>
          reset
        </button>
        <NumberDisplay key="time" val={time} />
      </div>
      <div className="body">{renderCells()}</div>
    </div>
  );
};

export default App;
