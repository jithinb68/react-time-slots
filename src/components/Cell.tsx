import { MouseEvent, useContext } from "react";
import DayPartingContext from "../context/DayPartingContext";
import { TimeCellActionType } from "../types/types";

interface ICellProps {
  label?: string,
  isLabel?: boolean
  day?: string
  time?: string,
  isSelected?: boolean
}

const Cell = ({
  label, 
  isLabel = false,
  day,
  time,
  isSelected
}: ICellProps) => {
  const timeCellClickContext = useContext(DayPartingContext).onTimeCellClick;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isLabel && timeCellClickContext && day && time) {
      timeCellClickContext({ type: TimeCellActionType.SELECT, day, time });
    }
  };

  return (
    <div 
      className={`w-14 h-7 rounded mb-1 mr-1 ${isLabel ? 'text-center': 'bg-blue-400 cursor-pointer'} ${isSelected ? 'bg-red-400' : ''}`} 
      data-day={day} 
      data-time={time}
      onClick={handleClick}
      >
        {label}
    </div>
  )
}

export default Cell;