import { useState } from "react"
import "./App.css"
import NumberDisplay from "./component/NumberDisplay/NumberDisplay"
import {makeCells} from "./logic/Logic"
import Button from "./component/Button/Button"
import { Cell, cellStatus } from "./types/Types"
const App = () => {
  
  const [cells, setCells] = useState(makeCells());

  const onButtonLeftClick = (cell:Cell) => {
    let newcells=cells.slice();
    newcells[cell.indexRow][cell.indexCol]={...cell,stat:cellStatus.open}
    setCells(newcells)
  };
  const renderCells=():React.ReactNode=>{
    return cells.map((row,rowIndex)=>{
    return row.map((cellObject,colIndex)=><Button cell={cellObject} onclick={()=>onButtonLeftClick(cellObject)} key={`${rowIndex},${colIndex}`}/>)})
  }
 
  const restartBoard=()=>{
    setCells(makeCells());
    renderCells();
  }

 
  return (
    <div className="App">
      <div className="header">
        <NumberDisplay val={3} />
        <button className="button" onClick={restartBoard}>&#x1F33C;</button>
        <NumberDisplay val={3} />
      </div>
      <div className="body">{renderCells()}
      </div>
    </div>
  );
}

export default App