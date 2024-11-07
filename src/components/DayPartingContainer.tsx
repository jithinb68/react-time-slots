import { useState } from "react";
import DayParting from "./DayParting";
import DayPartingForm from "./DayPartingForm";
import { endTimeLists, intervalLists, startTimeLists } from "../constants/constants";
import DayPartingContext from "../context/DayPartingContext";
import { TimeCellAction, TimeCellActionType } from "../types/types";
import useTimeCellStates from "../hooks/useTimeCellStates";

const DayPartingContainer = () => {
  const [selectedInterval, setSelectedInterval] = useState<number>(60);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("09:00:00");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("23:00:00");
  const [error, setError] = useState<string>('')

  // useTimeCellStates takes in StartTime, EndTime and Interval and returns below values and its used for
  // @timeIntervals - used for rendering the JSX in react
  // @timeCellStates - maintains the metadata of the cell like isAccordionItemSelected, isDisabled of the cells
  // @updateTimeCellState exposes an update method to be triggered on cell click to update the value of timeCellStates
  const [timeIntervals, timeCellStates, updateTimeCellState] = useTimeCellStates({startTime: selectedStartTime, endTime: selectedEndTime, interval: selectedInterval , supportedIntervals: [60, 30], setError});
  
  const onTimeCellClick = (action: TimeCellAction) => {
    switch (action.type) {
      case TimeCellActionType.SELECT:
        // Toggle selection of individual time slot
        updateTimeCellState(action.day, action.time!, { isSelected:!timeCellStates[action.day][action.time!].isSelected });
        break;
      case TimeCellActionType.SELECT_ALL:
        // Set selection of all time slots for the day
        Object.keys(timeCellStates[action.day]).forEach((timeSlot) => {
          updateTimeCellState(action.day, timeSlot, { isSelected: action.isSelected });
        });
        break;
      case TimeCellActionType.DRAG:
        // Handle drag action (to be implemented later)
        console.log('Drag action not implemented yet');
        break;
      default:
        throw new Error(`Invalid action: ${action}`);
    }
  };

  console.log(timeCellStates);

  return (
    <DayPartingContext.Provider value={{onTimeCellClick, timeCellStates, setError}}>
      <div className="flex">
        <DayPartingForm 
          intervalLists={intervalLists} 
          startTimeLists={startTimeLists} 
          endTimeLists={endTimeLists}
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
          selectedStartTime={selectedStartTime}
          setSelectedStartTime={setSelectedStartTime}
          selectedEndTime={selectedEndTime}
          setSelectedEndTime={setSelectedEndTime}
        />
        {
          timeIntervals.length ? 
          <DayParting 
            timeIntervals={timeIntervals}
          /> : <div className="px-8 text-red-400">There is some issue with store start time / end time / interval selected</div>
        }
        {
          error && <p className="text-red-400">Error : {error}</p>
        }
      </div>
    </DayPartingContext.Provider>
  )
}

export default DayPartingContainer;