import React from 'react'
import {Cell,cellStatus,cellValue} from "../../types/Types"
import "./Button.css"

interface ButtonProps{
    cell:Cell
    onclick:any //change later!!!!!!!!!!!!!!!!
}
const Button = ({cell, onclick}:ButtonProps) => {

    const getWhatToShow=()=>{
        if(cell.stat===cellStatus.open && cell.val!=cellValue.none){
            return cell.val;
        }
        else if(cell.stat===cellStatus.close || cell.val===cellValue.none ){
            return "";
        }
        else if(cell.stat===cellStatus.flagged)
            return "🚩";
        else
            return "";
        
    }
  return (
    <div className={`button ${cell.stat === cellStatus.open? "open": ""}`} onClick={onclick}>{getWhatToShow()}</div>
  )
}

export default Button