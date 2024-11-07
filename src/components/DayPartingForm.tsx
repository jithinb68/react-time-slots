// Dont review this component as its for Test Environment Form

import { Form } from "react-bootstrap";

interface IDayPartingForm {
  // Dont review  - Test purpose
  intervalLists: any
  startTimeLists: any
  endTimeLists: any
  selectedInterval: any
  setSelectedInterval: any
  selectedStartTime: any
  setSelectedStartTime: any
  selectedEndTime: any
  setSelectedEndTime: any
}

const DayPartingForm = ({intervalLists, startTimeLists, endTimeLists, selectedInterval, setSelectedInterval, selectedStartTime, setSelectedStartTime, selectedEndTime, setSelectedEndTime}: IDayPartingForm) => {

  const handleIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterval(parseInt(event.target.value));
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(parseInt(event.target.value));
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndTime(parseInt(event.target.value));
  };

  return (
    <div className="w-96 mr-32">
       <div className="flex items-center justify-center pb-4">
        <div className="pr-16 w-72" >Interval</div>
        <Form.Select aria-label="Default select example" value={selectedInterval} onChange={handleIntervalChange}>
          {intervalLists.map((item: any) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Form.Select>
      </div>
      <div className="flex items-center justify-center pb-4">
        <div className="pr-16 w-72 text-nowrap" >Start time</div>
        <Form.Select aria-label="Default select example" value={selectedStartTime} onChange={handleStartTimeChange}>
          {startTimeLists.map((item: any) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Form.Select>
      </div>
      <div className="flex items-center justify-center pb-4">
        <div className="pr-16 w-72 text-nowrap" >End time</div>
        <Form.Select aria-label="Default select example" value={selectedEndTime} onChange={handleEndTimeChange}>
          {endTimeLists.map((item: any) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Form.Select>
      </div>
    </div>
  )
}

export default DayPartingForm;