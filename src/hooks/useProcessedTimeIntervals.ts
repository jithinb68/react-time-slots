import { useMemo } from "react";
import { ProcessedTimeIntervalsArgs, TimeInterval } from "../types/types";
import { sensoryIntervals } from "../constants/constants";
// import DayPartingContext from "../context/DayPartingContext";

/**
 * This function handles sensory intervals. If there's a current interval being merged, it extends its end time
 * and adds the start time of the current interval to its sub-intervals. If there's no current interval being merged, it starts a new one.
 * 
 * Example Input: 
 * currentInterval = { "startTime": "10:00:00", "endTime": "10:59:59", "isSensoryInterval": true }
 * time = { "startTime": "11:00:00", "endTime": "11:59:59", "isSensoryInterval": true }
 * 
 * Example Output: 
 * currentInterval = { "startTime": "10:00:00", "endTime": "11:59:59", "isSensoryInterval": true, "subIntervalStartTimes": [ "10:00:00",  "11:00:00"] }
 */
const handleSensoryInterval = (currentInterval: TimeInterval | null, time: TimeInterval) => {
  if (currentInterval) {
    currentInterval.endTime = time.endTime;
    currentInterval.subIntervalStartTimes = currentInterval.subIntervalStartTimes || [];
    currentInterval.subIntervalStartTimes.push(time.startTime);
  } else {
    currentInterval = { ...time, subIntervalStartTimes: [time.startTime] };
  }
  return currentInterval;
};

/**
 * This function handles non-sensory intervals. If there's a current interval being merged, it adds it to the merged intervals.
 * Then, it adds the current interval to the merged intervals.
*/
const handleNonSensoryInterval = (mergedIntervals: TimeInterval[], currentInterval: TimeInterval | null, time: TimeInterval) => {
  if (currentInterval) {
    mergedIntervals.push(currentInterval);
    currentInterval = null;
  }
  mergedIntervals.push(time);
  return { mergedIntervals, currentInterval };
};


/**
 * This function merges sensory intervals in a list of time intervals.
 * 
 * Example Input: 
 * [
 *   { "startTime": "09:00:00", "endTime": "09:59:59", "isSensoryInterval": false },
 *   { "startTime": "10:00:00", "endTime": "10:59:59", "isSensoryInterval": true },
 *   { "startTime": "11:00:00", "endTime": "11:59:59", "isSensoryInterval": true }
 * ]
 * 
 * Example Output: 
 * [
 *   { "startTime": "09:00:00", "endTime": "09:59:59", "isSensoryInterval": false },
 *   { "startTime": "10:00:00", "endTime": "11:59:59", "isSensoryInterval": true, "subIntervalStartTimes": [ "10:00:00",  "11:00:00"] }
 * ]
 */
const mergeSensoryIntervals = (timeIntervals: TimeInterval[]) => {
  let mergedIntervals: TimeInterval[] = [];
  let currentInterval: TimeInterval | null = null;

  timeIntervals.forEach((time, index) => {
    if (time.isSensoryInterval) {
      currentInterval = handleSensoryInterval(currentInterval, time);
    } else {
      const result = handleNonSensoryInterval(mergedIntervals, currentInterval, time);
      mergedIntervals = result.mergedIntervals;
      currentInterval = result.currentInterval;
    }

    if (index === timeIntervals.length - 1 && currentInterval) {
      mergedIntervals.push(currentInterval);
    }
  });

  return mergedIntervals;
};

// Function to format time
const formatTime = (hours: number, minutes: number, seconds: number) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Function to check if a time interval is sensory
const isSensory = (startTime: string, endTime: string) => {
  if (!sensoryIntervals ||!Array.isArray(sensoryIntervals)) return false;
  return sensoryIntervals.some(interval => parseInt(startTime) >= parseInt(interval.startTime) && parseInt(endTime) <= parseInt(interval.endTime));
};

// Function to convert time format "HH:MM:SS" to minutes
const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

function validatePayload(startTime: string, endTime: string, interval: number, supportedIntervals: number[], setError: (error: string) => void): boolean {
  const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

  if (!timeRegex.test(startTime)) {
    setError('Invalid start time. Please enter a valid time in HH:MM:SS format.');
    return false;
  }

  if (!timeRegex.test(endTime)) {
    setError('Invalid end time. Please enter a valid time in HH:MM:SS format.');
    return false;
  }

  const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
  const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

  if (
    (startHour < 1 || startHour > 23) ||
    (startMinute < 0 || startMinute > 59) ||
    (startSecond < 0 || startSecond > 59) ||
    (endHour < 1 || endHour > 23) ||
    (endMinute < 0 || endMinute > 59) ||
    (endSecond < 0 || endSecond > 59)
  ) {
    setError('Invalid time. Please enter a valid time between 00:00:00 and 23:59:59.');
    return false;
  }

  if (!supportedIntervals.includes(interval)) {
    setError(`Invalid interval ${interval}. Please select a valid interval which is supported.`);
    return false;
  }

  return true;
}

/**
 * This function processes time intervals. It takes start time, end time, and interval as input, 
 * and returns an array of time intervals with sensory intervals merged.
 * 
 * Example Input: 
 * startTime = "09:00:00"
 * endTime = "23:00:00"
 * interval = 60 (minutes)
 * 
 * Example Output: 
 * [
 *   { "startTime": "09:00:00", "endTime": "09:59:59", "isSensoryInterval": false },
 *   { "startTime": "10:00:00", "endTime": "11:59:59", "isSensoryInterval": true, "subIntervalStartTimes": [ "10:00:00",  "11:00:00"] }
 * ]
 */
export const useProcessedTimeIntervals = ({startTime, endTime, interval, supportedIntervals, setError } : ProcessedTimeIntervalsArgs) => {
  return useMemo(() => {
    try {
      if(!validatePayload(startTime, endTime, interval, supportedIntervals, setError)) return [];
      const timeIntervals = [];
      const startTimeInMinutes = timeToMinutes(startTime);
      const endTimeInMinutes = timeToMinutes(endTime);
  
      for (let i = startTimeInMinutes; i < endTimeInMinutes; i += interval) {
        const startHours = Math.floor(i / 60);
        const startMinutes = i % 60;
        const intervalStartTime = formatTime(startHours, startMinutes, 0);
  
        const endHours = startHours + Math.floor((interval - 1) / 60);
        const endMinutes = (startMinutes + interval - 1) % 60;
        const intervalEndTime = formatTime(endHours, endMinutes, 59);
  
        const isSensoryInterval = isSensory(intervalStartTime, intervalEndTime);
  
        timeIntervals.push({
          startTime: intervalStartTime,
          endTime: intervalEndTime,
          isSensoryInterval,
        });
      }
  
      const timeIntervalWithSensoryIntervalsMerged = mergeSensoryIntervals(timeIntervals);
  
      return timeIntervalWithSensoryIntervalsMerged;
    } catch(error) {
      setError('Something went wrong in custom scheduling. Please try again with correct start date , end date and interval');
      return []
    }
   
  }, [startTime, endTime, interval])
};