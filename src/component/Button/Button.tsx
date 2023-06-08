import React from 'react'
import {Cell,cellStatus,cellValue} from "../../types/Types"
import "./Button.css"

interface ButtonProps{
    cell:Cell
    onclick:any //change later!!!!!!!!!!!!!!!!
    onRightClick: any
    onFirstClick: any
}
const Button = ({cell, onclick,onRightClick,onFirstClick}:ButtonProps) => {

    const getWhatToShow=()=>{
        if(cell.stat===cellStatus.open ){
            if (cell.val!=cellValue.none && cell.val!=cellValue.bomb) 
                return cell.val;
            else if(cell.val===cellValue.bomb)
                return 	"💣";
            else return "";
        }
        else if(cell.stat===cellStatus.close){
            return "";
        }
        else return "🚩";        
    }
  return (
    <div className={`button ${cell.stat === cellStatus.open? "open": ""}`} onContextMenu={(e)=>{onRightClick(e)}} onClick={()=>{onFirstClick(); onclick()}}>{getWhatToShow()}</div>
  )
}

export default Button