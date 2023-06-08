import { useState } from "react"
import "./App.css"
import NumberDisplay from "./component/NumberDisplay/NumberDisplay"
import {makeCells} from "./logic/Logic"
import Button from "./component/Button/Button"
const App = () => {
  
  const [cells, setCells] = useState(makeCells());

  const renderCells=():React.ReactNode=>{
    return cells.map((row,rowIndex)=>{
    return row.map((cell,colIndex)=><Button/>)})
  }
 
  return (
    <div className="App">
      <div className="header">
        <NumberDisplay val={3} />
        <div className="flower">&#x1F33C;</div>
        <NumberDisplay val={3} />
      </div>
      <div className="body">{renderCells()}
      </div>
    </div>
  );
}

export default App