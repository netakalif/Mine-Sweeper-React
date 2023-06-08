import{NUMBER_OF_ROWS,NUMBER_OF_COLUMNS,NUMBER_OF_BOMBS} from "../constant/Constant"
import { Cell,cellValue,cellStatus } from "../types/Types"; "../types/Types"
export const makeCells=()=>{
    let cells:Cell[][]=[];
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

    let numberOfBombsPlaced:number=0;
    while(numberOfBombsPlaced<NUMBER_OF_BOMBS){
        const row=Math.floor(Math.random()*NUMBER_OF_ROWS)
        const col=Math.floor(Math.random()*NUMBER_OF_COLUMNS)
        const currCell=cells[row][col]
        if(currCell.val!=cellValue.bomb){
            cells[row][col]={...currCell,val:cellValue.bomb}
            numberOfBombsPlaced++;
        }
    }



    return cells;
}


const addValuesToCells=(cells:Cell[][])=>{
    for(let row=0; row<cells.length;row++){
        for(let col=0; col<cells[row].length;col++){
            
        }
    }

}