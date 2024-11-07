import { useContext } from "react";
import { weekDays } from "../constants/constants";
import TimeSelectCell from "./Cell";
import DayPartingContext from "../context/DayPartingContext";

interface ITimeRow {
  time: string
}

const TimeRow = ({time}: ITimeRow) => {
  const timeCellStates = useContext(DayPartingContext).timeCellStates;
  return (
    <div className="flex">
        {Array.from({ length: weekDays?.length }, (_, i) => (
          <TimeSelectCell 
            key={`${weekDays[i]?.label}-${time}`} 
            day={weekDays[i]?.name} time={time} 
            isSelected={timeCellStates?.[weekDays[i]?.name]?.[time]?.isSelected}
          />
        ))}
    </div>
  )
}

export default TimeRow;