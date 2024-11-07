import { Day } from "../types/types";

export const intervalLists = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 }
];

export const startTimeLists = [
  { label: '9:00 AM', value: 9 },
  { label: '10:00 AM', value: 10 },
  { label: '11:00 AM', value: 11 }
];

export const endTimeLists = [
  { label: '4:00 PM', value: 16 },
  { label: '5:00 PM', value: 17 },
  { label: '6:00 PM', value: 18 },
  { label: '7:00 PM', value: 19 },
  { label: '8:00 PM', value: 20 },
  { label: '9:00 PM', value: 21 },
  { label: '10:00 PM', value: 22 },
  { label: '11:00 PM', value: 23 },
  { label: '12:00 AM', value: 24 },
  { label: '1:00 AM', value: 1 }
];


export const weekDays = [
  {
    name: Day.SUNDAY,
    label: 'Sun'
  },
  {
    name: Day.MONDAY,
    label: 'Mon'
  },
  {
    name: Day.TUESDAY,
    label: 'Tue'
  },
  {
    name: Day.WEDNESDAY,
    label: 'Wed'
  },
  {
    name: Day.THURSDAY,
    label: 'Thu'
  },
  {
    name: Day.FRIDAY,
    label: 'Fri'
  },
  {
    name: Day.SATURDAY,
    label: 'Sat'
  }
];

export const sensoryIntervals = [
  {
    startTime: '10:00:00',
    endTime: '11:59:59'
  },
  {
    startTime: '13:00:00',
    endTime: '15:59:59'
  },
  {
    startTime: '16:00:00',
    endTime: '17:59:59'
  }
];