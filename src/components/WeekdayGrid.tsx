import { useContext } from "react";
import { weekDays } from "../constants/constants";
import DayOfWeekCell from "./Cell";
import DayPartingContext from "../context/DayPartingContext";
import { TimeCellActionType } from "../types/types";

const WeekdayGrid = () => {
  const { onTimeCellClick } = useContext(DayPartingContext);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weekdayName = e.target.name;
    const isChecked = e.target.checked;
    onTimeCellClick({ type: TimeCellActionType.SELECT_ALL, day: weekdayName, isSelected: isChecked });
  };

  return (
    <div className="flex">
      {
        weekDays.map((weekDay) => (
          <div className="flex flex-col items-center justify-center mb-4" key={weekDay.name}>
            <DayOfWeekCell label={weekDay.label} isLabel={true} />
            <div className="cursor-pointer">
              <input
                type="checkbox"
                id={weekDay.name}
                name={weekDay.name}
                value={weekDay.name}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default WeekdayGrid;