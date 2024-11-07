import React, { createContext } from "react";
import { WeekSelections } from "../types/types";

const DayPartingContext = createContext({
  onTimeCellClick: (() => {}) as Function,
  timeCellStates: {} as WeekSelections,
  setError: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});

export default DayPartingContext;