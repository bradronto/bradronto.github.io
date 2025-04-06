import React, { useState, useRef } from "react";
import "./styles/cool.css"
import SelectWithNewItem from "./a";
import NumberInBox from "./number-in-box";
import generateTimeOptions from "./time-select"
import getMonth from "./date-header";
import getDatesOfCurrentWeek from "./current-week";

const WorkHoursTracker = () => {
  const daysOfWeek = getDatesOfCurrentWeek();

  const [workHours, setWorkHours] = useState(
    daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM" : "7:00 AM", job: "Lake Mariner Data", isChecked: index < 5 ?true:false }))
  );

  const handleChange = (index, type, value) => {
    const updatedWorkHours = [...workHours];
    updatedWorkHours[index][type] = value;
    setWorkHours(updatedWorkHours);
    console.log(workHours[index].isChecked)
  };

  const calculateTotalHours = (start, end) => {
    const [start12, startPeriod] = start.split(" ");
    const[end12,endPeriod] = end.split(" ");
    const [startHour, startMinute] = start12.split(":").map(Number);
    const start24 = startPeriod === "AM" ? startHour : (startHour>11?startHour:startHour + 12) ;
    const [endHour, endMinute] = end12.split(":").map(Number);
    const end24 = endPeriod === "AM"?endHour:(endHour>11?endHour:endHour+12);
    return (end24 + endMinute / 60) - (start24 + startMinute / 60);
  };

  const totalWeeklyHours = workHours.reduce(
    (total, day) => total + calculateTotalHours(day.start, day.end),
    0
  );

  const timeOptions = generateTimeOptions();

  const optionsArray = ["Lake Mariner Data", "Linde Niag Falls"];
 
  const textRef = useRef();
  const [rawText, setRawText] = useState("wtf");
  
  const setraw = () => {
   const rawHTML = textRef.current.innerHTML;
   const convertedText = rawHTML
   .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
   .replace(/\.\s*\./g, "") // Remove consecutive dots if any
   .replace(/<br\s*\/?>/gi, "\n")
   .replace(/&nbsp;/g, "");
   setRawText(convertedText);
  }



  return (
  <div className="input-container" >
    <h1 style={{  display:"flex", justifyContent:"center", alignItems: "center"}} className="cool-header"> {getMonth()} &nbsp; &nbsp;&nbsp;&nbsp; {totalWeeklyHours.toFixed(1)} hrs</h1>
     {daysOfWeek.map((day, index) => (
       <table key={index} style={{ marginLeft: "10px" }}>
         <tr><td style={{
        display: "flex", // Enables Flexbox
        alignItems: "flex-start", // Aligns items to the top
        gap: "5px", // Adds spacing between the checkbox and the box
      }}>
         <input style={{textAlign: "top"}}
          type="checkbox"
          checked={workHours[index].isChecked}
          onChange={(e) => handleChange(index, "isChecked", !workHours[index].isChecked)}       
        />
         <NumberInBox day={day} color="grey" />
             <br></br>
          
            </td>
            <td>   
         <div>
      {workHours[index].isChecked ? (
        <>
          
          <SelectWithNewItem  myArray={optionsArray} />
       <select  className="cool-time-select"// style={{ marginRight: "0px" }} 
        defaultValue={timeOptions['14']}
        onChange={(e) => handleChange(index, "start", e.target.value)}
        >
         {timeOptions.map((time, indx) => (
        <option  key={indx} value={time}>
          {time}
        </option>
      ))}
        </select>         
          <select className="cool-time-select" //style={{ marginRight: "0px" }} 
        defaultValue={timeOptions['30']}
        //defaultValue={workHours[index].end}
        onChange={(e) => handleChange(index, "end", e.target.value)}
               
        >
         {timeOptions.map((time, indx) => (
        <option  key={indx} value={time}>
          {time}
        </option>
      ))}
        </select> 
        
        </>
      ) : (
        <>
          
          <p className="cool-span"></p>
        </>
      )}
        </div>     
          </td> <td>
          <span style={{  display:"flex", justifyContent:"center", alignItems: "center" }}>
           {calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} <br />hrs
          </span>
            
            </td></tr> 
          </table>
       ))}
     
   
   
   
     <br />
      <a  style={{  display:"flex", justifyContent:"center", alignItems: "center"}} onClick={setraw}    href={`sms:?&body=${encodeURIComponent(rawText)}`}>
          share timecard via text message
        </a>
     <div  className="blue" ref={textRef} >
        
    <br /> {getMonth()}  
    <br></br><br></br>
    {daysOfWeek.map((day, index) => (
    <div  className="blue" key={index}  >

      <span style={{ marginLeft:"0px"}}>
      {daysOfWeek[index]}
      </span>
      <br />
       
         
         {workHours[index].job} <br></br>
          <span  className="indent">
           {workHours[index].start}-{workHours[index].end} <br></br>
            {calculateTotalHours(workHours[index].start, workHours[index].end)>8?8:calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} Hrs
          &nbsp; &nbsp; {calculateTotalHours(workHours[index].start, workHours[index].end)>8?calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)-8:0} O.T.
        </span><br></br><br></br>
        </div>
     ))}
     
             <span className="blue"> &nbsp; {totalWeeklyHours.toFixed(2)>40?40:totalWeeklyHours.toFixed(2)} Hrs &nbsp;&nbsp;&nbsp; {totalWeeklyHours.toFixed(1)>40?totalWeeklyHours.toFixed(1)-40:0} OT 
             
             </span>
      </div>
  </div>
);
};


function App() {
  const htmlRef = useRef();
  return (
    <div className="App" ref={htmlRef}>
         
      <WorkHoursTracker />
     
    </div>
  );
}

export default App;
