import { useMemo, useCallback, useState } from "react";
import { CellInteractionState, DaySelections, ProcessedTimeIntervalsArgs, TimeInterval, WeekSelections } from "../types/types";
import { useProcessedTimeIntervals } from "./useProcessedTimeIntervals";
import { weekDays } from "../constants/constants";


type UpdateTimeCellState = (day: string, time: string, newState: CellInteractionState,) => void

const useTimeCellStates = ({startTime, endTime, interval, supportedIntervals, setError } : ProcessedTimeIntervalsArgs): [TimeInterval[], WeekSelections, UpdateTimeCellState] => {

  // useProcessedTimeIntervals hook takes startTime , endTime, interval to return the timeIntervals split based on interval ( eg 9 - 9:59:59, 10 -10:29:59 )
  const timeIntervals: TimeInterval[] = useProcessedTimeIntervals({startTime, endTime, interval, supportedIntervals, setError});
  
  const initialCellStates = useMemo(() => {
    const newCellStates: WeekSelections = {};
    weekDays.forEach(day => {
      newCellStates[day.name] = {} as DaySelections;
      timeIntervals.forEach((interval: TimeInterval) => {
        newCellStates[day.name][interval.startTime] = { 
          "isSelected": false,
          "isDisabled": false,
          "isSensoryInterval": !!interval.isSensoryInterval, 
          "startTime": interval.startTime,
          "endTime": interval.endTime 
        };
      });
    });
    return newCellStates;
  }, [timeIntervals]);

  const [cellStates, setCellStates] = useState(initialCellStates);

  const updateTimeCellState = useCallback((day: string, time: string, updatedCellStateAfterInteraction: CellInteractionState) => {
    setCellStates((prevCellStates: WeekSelections) => ({
      ...prevCellStates,
      [day]: {
        ...prevCellStates[day],
        [time]: {
          ...prevCellStates[day][time],
          ...updatedCellStateAfterInteraction
        }
      }
    }));
  }, []);

  return [timeIntervals, cellStates, updateTimeCellState];
};

export default useTimeCellStates;