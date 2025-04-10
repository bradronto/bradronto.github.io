
import React, {useState,useEffect} from "react";

function SaveLocal() {
  const [workHours, setWorkHours] = useState(() => {
    // Load session data if available
    const savedData = localStorage.getItem("workHours");
    return savedData
      ? JSON.parse(savedData)
      : [
          { start: "7:00 AM", end: "3:00 PM", job: "Lake Mariner", isChecked: true, showNew: false },
          { start: "7:00 AM", end: "3:00 PM", job: "Lake Mariner", isChecked: true, showNew: false },
        ]; // Default value if no session data exists
  });

  useEffect(() => {
    // Save workHours to sessionStorage whenever it changes
    localStorage.setItem("workHours", JSON.stringify(workHours));
  }, [workHours]);

  const updateJob = (index, newJob) => {
    const updatedHours = [...workHours];
    updatedHours[index].job = newJob;
    setWorkHours(updatedHours);
  };

  return (
    <div>
      {workHours.map((hour, index) => (
        <div key={index}>
          <p>Start: {hour.start}</p>
          <p>End: {hour.end}</p>
          <p>Job: {hour.job}</p>
          <button onClick={() => workHours[index].job === "Alcatraz" ? updateJob(index, "Lake Mariner"): updateJob(index, "Alcatraz")}>Change Job </button>
          <hr />
        </div>
      ))}
    </div>
  );
}









export default SaveLocal;
