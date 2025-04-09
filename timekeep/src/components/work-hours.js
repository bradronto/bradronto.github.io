import React, { useState, useRef } from "react";
import "./styles/cool.css"
//import SelectWithNewItem from "./select-popup-input";
import NumberInBox from "./number-in-box";
import generateTimeOptions from "./time-select"
import getMonth from "./date-header";
import getDatesOfCurrentWeek from "./current-week";
import calculateTotalHours from "./total-hours"

const WorkHoursTracker = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);
 
  const [changeWeek, setChangeWeek] = useState(1);
  const daysOfWeek = getDatesOfCurrentWeek(changeWeek);  //chgwk is 1 for this week and -6 for last
  const initJobs = [];
  const [jobNames,setJobNames] = useState(initJobs);
  const [workHours, setWorkHours] = useState(
    daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showNew: false }))
  );
 
  const handleChange = (index, type, value) => 
  {
    const updatedWorkHours = [...workHours];
    const storedJob = updatedWorkHours[index].job // save jobname in the input popup
    updatedWorkHours[index][type] = value;

    type ==="isChecked" ? updatedWorkHours[index]["isChecked"] === false? updatedWorkHours[index]["end"] = "7:00 AM":updatedWorkHours[index]["end"]="3:00 PM":console.log("not suposed to")
    setWorkHours(updatedWorkHours);

    if (value === "New Item") {
      updatedWorkHours[index]["showNew"] = true;
      updatedWorkHours[index]["job"] = storedJob;

      setWorkHours(updatedWorkHours)
    } else {
      //setSelectedOption(value); // Update selected option
     }
    console.log(workHours[index].end)
  };

  
  const handleWeekChange = (chosenWeek) => 
    {
    chosenWeek==="last week" ? setChangeWeek(-6): setChangeWeek(1);
    };


  const totalWeeklyHours = workHours.reduce(
    (total, day) => total + calculateTotalHours(day.start, day.end),
    0
  );

  const weekTotal = () => 
  {
   const reg = workHours.slice(0,5).reduce(  // regular hours
    (total, day) => total + (calculateTotalHours(day.start, day.end) <=8 ?calculateTotalHours(day.start, day.end):8),
    0
   );

   const rot = workHours.slice(0,5).reduce(  // weekday OT hours
    (total, day) => total + (calculateTotalHours(day.start, day.end)>8?calculateTotalHours(day.start, day.end)-8:0),
    0
   );
  
   const wot = workHours.slice(5).reduce(  // weekend OT hours
    (total, day) => total + (calculateTotalHours(day.start, day.end)),
    0
   );
     
  const ot=rot+wot;
  return[reg,ot]
  }

  const timeOptions = generateTimeOptions();
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

const [reg,ot] = weekTotal();

 
  //const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  const [newOption, setNewOption] = useState(""); // State for new option input
 
  const handleEnterPress = (event,index,type) => 
    {
    const updatedWorkHours = [...workHours];
    const storedJob = workHours[index].job;
    if (event.key === "Enter") {
      if(newOption===""){
        updatedWorkHours[index][type] = storedJob;
        updatedWorkHours[index].showNew = false;
        setWorkHours(updatedWorkHours)
        console.log(event.key,newOption, storedJob)
          }
     else if (newOption.trim() && !jobNames.includes(newOption)) {
        updatedWorkHours[index][type] = newOption;
        setJobNames([...jobNames, newOption]);
        setWorkHours(updatedWorkHours)
        setIsFirstRun(false)

        console.log(updatedWorkHours[index])
        }
      workHours[index].showNew = false;
      setNewOption(""); // Clear the input field
      console.log(event.key,index,type,newOption.trim())
     }
 
  };


  return (
  <div className="input-container" >
    <span style={{  display:"flex", justifyContent:"center", alignItems: "center", marginBottom:"10px"}} className="cool-header"> 
       <select 
       className="cool-header-select"
       onChange={(e) => handleWeekChange(e.target.value)}
      >
        <option value="this week">
        {getMonth(1)} 
        </option>
        <option value="last week">
        {getMonth(-6)}
        </option>
      </select>

       &nbsp; &nbsp;&nbsp;&nbsp; 
       <span style={{ fontSize: "23px" }}>{totalWeeklyHours.toFixed(1)} hrs</span> 
      </span>
    
    
    
     {daysOfWeek.map((day, index) => (
       <table key={index} style={{marginLeft:"10px"}}>
        <tbody>
        <tr>
        <td style={{
        display: "flex", // Enables Flexbox
        alignItems: "flex-start", // Aligns items to the top
        gap: "5px", // Adds spacing between the checkbox and the box
      }}>
        <input style={{textAlign: "top"}}    // checkbox
          type="checkbox"
          checked={workHours[index].isChecked}
          onChange={(e) => handleChange(index, "isChecked", !workHours[index].isChecked)}       
        />
         <NumberInBox day={day} color="grey" />
             <br></br></td>
            <td>   
         <div>
          {workHours[index].isChecked ? (    // show day's form if box is checked
        <>
        <select  
          className="cool-input"// 
          value={workHours[index].job}
          onChange={(e) => handleChange(index, "job", e.target.value)}
        >
         {jobNames.map((job, indx) => (
        <option  key={indx} value={job}>
          {job}
        </option>))}
{isFirstRun?(
        <option value="New Item" >
          Enter a new jobname
        </option>
       ):(console.log(""))}
       <option value="New Item">New Job</option>
        </select> 
         {/* Pop-up Input */}
  {workHours[index].showNew === true && (
        <div>
          <input className="cool-pop-up" 
            type="text"
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="new job name"
           onKeyUp={(e) => handleEnterPress(e,index,"job")}
            autoFocus
          />
        </div>
      )}
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
          <p className="cool-span"> No Hours   </p> 
        </>
      )}
        </div>     
          </td> <td style={{marginBottom: "0px", alignContent:"baselines"}}>
          <span style={{  marginBottom: "0px", alignContent:"baselines" }}>
           {    //index<5?( // is it a weekday?
            workHours[index].isChecked?(
            <>
          {
           calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)
            } 
             <br /> 
           
            </>
           ) : ( //weekends are OT
            <> 
           {
           //calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)
            } 

             </>)}
           </span>
           </td></tr></tbody></table>
       ))}
     
   
   
   
     <br />
      <a  style={{  display:"flex", justifyContent:"center", alignItems: "center"}} onClick={setraw}    href={`sms:?&body=${encodeURIComponent(rawText)}`}>
          share timecard via text message
        </a>
     <div  className="blue" ref={textRef} >
        
    <br /> {getMonth(changeWeek)}  
    <br></br><br></br>
    {daysOfWeek.map((day, index) => (
    <div  className="blue" key={index}  >

{workHours[index].isChecked ? (  // only show checked days
        <>
      <span style={{ marginLeft:"0px"}}>
      {daysOfWeek[index] }
      </span>
           
      &nbsp; - {workHours[index].job} <br></br>
         <span  className="indent">
      &nbsp;     {workHours[index].start}-{workHours[index].end} <br></br>

      &nbsp;     {index<5?(
            <>

            {calculateTotalHours(workHours[index].start, workHours[index].end)>8?8:calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} Hrs
            &nbsp; &nbsp; {calculateTotalHours(workHours[index].start, workHours[index].end)>8?calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)-8:0} O.T.
       
          </>
           ) : (
            
            <>
            0.0 Hrs  &nbsp; &nbsp;{calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} O.T.
            
            
            </>)}
       
       
       
        </span>
      
        <br />
        <br />
        </>
          
        ) : (  // no work days
          <>
           {daysOfWeek[index] }
           <br />
           &nbsp; &nbsp;No Hours
           <br /><br />
          </>
        )}

        </div>
     ))}
           
           <span>{reg} hrs   &nbsp;{ot} OT</span>

           <br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
  </div>
);


};


export default WorkHoursTracker;
