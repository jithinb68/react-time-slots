import { TimeInterval } from "../types/types";
import TimeLabelCell from "./Cell";
import SensoryIntervals from "./SensoryIntervals";
import TimeRow from "./TimeRow";
import WeekdayGrid from "./WeekdayGrid";

interface IDayParting { 
  timeIntervals: TimeInterval[]
}

const DayParting = ({ timeIntervals }: IDayParting) => {

  const sensoryLabels = (timeInterval: TimeInterval) => (
    <div className="flex flex-col">
      {/* Render 9:00 and 10:00 as flex column (if subIntervalStartTimes = [ 9:00, 10:00 ]) which will be flexed with  SensoryIntervals component */}
      {timeInterval?.subIntervalStartTimes?.map((time: string) => (
        <TimeLabelCell label={time?.slice(0, 5)} isLabel={true} key={time}/>
      ))}
    </div>
  );
  
  return (
    <div>
      <div className="ml-14">
        <WeekdayGrid />
      </div>
        {timeIntervals.map((timeInterval: TimeInterval) => (
          <div className="flex" key={timeInterval.startTime}>
            {/* Requirement - SensoryInterval component should show a single component against adjacent intervals ( eg - 9 AM to 11 AM ) of sensory hours.
            We render JSX using flexbox to achieve this based on the condition time.isSensoryInterval which uses subIntervalStartTimes.
            Else case we render normal TimeLabelCell alog with TimeRow as flexbox. So we can 2 combination as listed below
            1. Flexbox of sensoryLabels(time) and SensoryIntervals
            2. Flexbox of TimeLabelCell and TimeRow  */}
            { timeInterval?.isSensoryInterval ? sensoryLabels(timeInterval) : <TimeLabelCell label={timeInterval?.startTime?.slice(0, 5)} isLabel={true}/> }
            { timeInterval?.isSensoryInterval ? <SensoryIntervals /> : <TimeRow time={timeInterval?.startTime} /> }
          </div>
      ))}
    </div>
  )
}

export default DayParting;