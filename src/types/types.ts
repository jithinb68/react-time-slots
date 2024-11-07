export interface TimeList {
  label: string;
  value: number;
}

export interface SensoryInterval {
  startTime: string;
  endTime: string;
}

export interface TimeInterval {
  startTime: string;
  endTime: string;
  isSensoryInterval: boolean;
  subIntervalStartTimes?: string[];
}

export enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

type TimeCellMetadata = {
  isSelected: boolean;
  isDisabled: boolean;
  isSensoryInterval: boolean;
  startTime: string;
  endTime: string;
};

export type DaySelections = {
  [time: string]: TimeCellMetadata;
};

export type WeekSelections = {
  [day: string]: DaySelections;
};

export type CellInteractionState = {
  isSelected: boolean;
};
  

export interface ProcessedTimeIntervalsArgs {
  startTime: string, 
  endTime: string, 
  interval: number, 
  supportedIntervals: number[],
  setError: any
}

export enum TimeCellActionType {
  SELECT,
  SELECT_ALL,
  DRAG
}

export interface TimeCellAction {
  type: TimeCellActionType;
  day: string;
  time?: string;
  isSelected: boolean
}