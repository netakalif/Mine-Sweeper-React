import React from 'react'
import "./NumberDisplay.css"
interface NumberDisplayProps{
    val:number
}

const NumberDisplay:React.FC<NumberDisplayProps> = ({val}) => {
    const showVal=val.toString().padStart(3,'0');
  return (
    <div className='NumberDisplay'>{showVal}</div>
  )
}

export default NumberDisplay