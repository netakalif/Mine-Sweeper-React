import{NUMBER_OF_ROWS,NUMBER_OF_COLUMNS,NUMBER_OF_BOMBS} from "../constant/Constant"
import { Cell,cellValue,cellStatus } from "../types/Types"; "../types/Types"
export const makeCells=()=>{
    const cells:Cell[][]=[];
    for(let row=0;row<NUMBER_OF_ROWS;row++)
    {
        cells.push([]);

        for(let col=0;col<NUMBER_OF_COLUMNS;col++){
            cells[row].push({
                val:cellValue.none,
                stat:cellStatus.close,
                indexCol:col,
                indexRow:row
            })
        }
    }
    return cells;
}