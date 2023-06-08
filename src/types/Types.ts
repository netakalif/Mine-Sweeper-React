export enum cellValue{
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb
}

export enum cellStatus{
    open,
    close,
    flagged
}
export interface Cell{
    val:cellValue,
    stat:cellStatus,
    indexCol:number,
    indexRow:number
}