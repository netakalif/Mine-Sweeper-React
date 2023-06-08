import {
  NUMBER_OF_ROWS,
  NUMBER_OF_COLUMNS,
  NUMBER_OF_BOMBS,
} from "../constant/Constant";
import { Cell, cellValue, cellStatus } from "../types/Types";
("../types/Types");
export const makeCells = () => {
  let cells: Cell[][] = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    cells.push([]);

    for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
      cells[row].push({
        val: cellValue.none,
        stat: cellStatus.close,
        indexCol: col,
        indexRow: row,
      });
    }
  }

  let numberOfBombsPlaced: number = 0;
  if (NUMBER_OF_BOMBS > NUMBER_OF_COLUMNS * NUMBER_OF_ROWS) {
    alert("too many bombs");
  } else {
    while (numberOfBombsPlaced < NUMBER_OF_BOMBS) {
      const row = Math.floor(Math.random() * NUMBER_OF_ROWS);
      const col = Math.floor(Math.random() * NUMBER_OF_COLUMNS);
      const currCell = cells[row][col];
      if (currCell.val != cellValue.bomb) {
        cells[row][col] = { ...currCell, val: cellValue.bomb };
        numberOfBombsPlaced++;
      }
    }

    const nearByBombs = (row: number, col: number): number => {
      let numberOfNearBombs = 0;
      if (
        isSafe(row - 1, col - 1) &&
        cells[row - 1][col - 1].val === cellValue.bomb
      )
        numberOfNearBombs++;
      if (isSafe(row - 1, col) && cells[row - 1][col].val === cellValue.bomb)
        numberOfNearBombs++;
      if (
        isSafe(row - 1, col + 1) &&
        cells[row - 1][col + 1].val === cellValue.bomb
      )
        numberOfNearBombs++;
      if (isSafe(row, col - 1) && cells[row][col - 1].val === cellValue.bomb)
        numberOfNearBombs++;
      if (isSafe(row, col + 1) && cells[row][col + 1].val === cellValue.bomb)
        numberOfNearBombs++;
      if (
        isSafe(row + 1, col - 1) &&
        cells[row + 1][col - 1].val === cellValue.bomb
      )
        numberOfNearBombs++;
      if (isSafe(row + 1, col) && cells[row + 1][col].val === cellValue.bomb)
        numberOfNearBombs++;
      if (
        isSafe(row + 1, col + 1) &&
        cells[row + 1][col + 1].val === cellValue.bomb
      )
        numberOfNearBombs++;
      return numberOfNearBombs;
    };

    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
        const currCell = cells[row][col];
        if (currCell.val != cellValue.bomb) {
          const numberOfBombs = nearByBombs(row, col);
          cells[row][col] = { ...currCell, val: numberOfBombs };
        }
      }
    }
  }

  return cells;
};

const isSafe = (row: number, col: number): boolean => {
  if (row < 0 || row >= NUMBER_OF_ROWS || col < 0 || col >= NUMBER_OF_COLUMNS)
    return false;
  return true;
};

export const discoverCells = (
  cells: Cell[][],
  row: number,
  col: number,
  handleBomb: any
): Cell[][] => {
  const newCells = cells.slice();
  const temp = (row1: number, col1: number) => {
    const currCell = cells[row1][col1];
    if (currCell.stat === cellStatus.open) return;
    else {
      currCell.stat = cellStatus.open;

      if (currCell.val === cellValue.bomb) {
        handleBomb(newCells);
      } else if (currCell.val !== cellValue.none) {
        return;
      } else {
        //val=none
        isSafe(row1 - 1, col1 - 1) ? temp(row1 - 1, col1 - 1) : null;
        isSafe(row1 - 1, col1) ? temp(row1 - 1, col1) : null;
        isSafe(row1 - 1, col1 + 1) ? temp(row1 - 1, col1 + 1) : null;
        isSafe(row1, col1 - 1) ? temp(row1, col1 - 1) : null;
        isSafe(row1, col1 + 1) ? temp(row1, col1 + 1) : null;
        isSafe(row1 + 1, col1 - 1) ? temp(row1 + 1, col1 - 1) : null;
        isSafe(row1 + 1, col1) ? temp(row1 + 1, col1) : null;
        isSafe(row1 + 1, col1 + 1) ? temp(row1 + 1, col1 + 1) : null;
      }
    }
  };
  temp(row, col);
  return newCells;
};

export const openAllBombs = (cells: Cell[][]) => {
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
      const currCell = cells[row][col];
      if (currCell.val === cellValue.bomb) {
        cells[row][col] = { ...currCell, stat: cellStatus.open };
      }
    }
  }
};
