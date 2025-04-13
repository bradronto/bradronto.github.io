import React, { useState, useRef, useEffect } from "react";
import "./styles/cool.css";
import NumberInBox from "./number-in-box";
import generateTimeOptions from "./time-select";
import getMonth from "./date-header";
import getDatesOfCurrentWeek from "./current-week";
import calculateTotalHours from "./total-hours";
import weekTotal from "./week-total";
import plainText from "./plain-txt";

const WorkHoursTracker = () => {

  
  const [isFirstRun, setIsFirstRun] = useState(true);
 
  const [changeWeek, setChangeWeek] = useState(1);
  const daysOfWeek = getDatesOfCurrentWeek(changeWeek);  //chgwk is 1 for this week and -6 for last
  const [jobNames,setJobNames] = useState(() => {
    // Load session data if available
    const savedData = localStorage.getItem("jobNames");
    return savedData
      ? JSON.parse(savedData)
      :
      []  });

    const [workHours, setWorkHours] = useState(() => {
      // Load session data if available
      const savedData = localStorage.getItem("workHours");
      return savedData
        ? JSON.parse(savedData)
        :
        daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showNew: false }))
    });

  useEffect(() => {
      // Save workHours to sessionStorage whenever it changes
      localStorage.setItem("workHours", JSON.stringify(workHours));
    }, [workHours]
  );

  useEffect(() => {
    // Save workHours to sessionStorage whenever it changes
    localStorage.setItem("jobNames", JSON.stringify(jobNames));
  }, [jobNames]
  
 


);
const handleMenu = (value) => 
  {if (    value ==="dont kjhkjh"  )
    {} else

  if (    value ==="clear jobs"  )
    {setJobNames([]); } else

  if (    value ==="clear hours"  )
    {
      setWorkHours(
        daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showNew: index < 1 ?true:false }))
        )
    } 
  }

  const handleChange = (index, type, value) => 
    {
      const updatedWorkHours = [...workHours];
      updatedWorkHours[index][type] = value;
   
      if (    type ==="isChecked"  )
        {
        updatedWorkHours[index]["isChecked"] === false? updatedWorkHours[index]["end"] = "7:00 AM":updatedWorkHours[index]["end"]="3:00 PM"
      }
  setWorkHours(updatedWorkHours);
     }
  


  const handleJobChange = (index, type, value) => 
  {
    const updatedWorkHours = [...workHours];

    const newJob = () => {

      {/*  add job to job names */}
      if(newOption===""){
        updatedWorkHours[index].showNew = false;
        console.log("no option entered")
          } 
          
          else if (newOption.trim() && !jobNames.includes(newOption)) 
            {
        updatedWorkHours[index][type] = newOption; //add job
        setJobNames([...jobNames, newOption]);
        updatedWorkHours[index].showNew = false;
        //setWorkHours(updatedWorkHours);


        if(jobNames.length===0){
          console.log("spread the jobs");
          updatedWorkHours.map((record)=>{record.job = newOption}
        ) }

        /*
        if(isFirstRun ){
          console.log("first run");
          setIsFirstRun(false);
          setWorkHours((prevWorkHours) =>
            prevWorkHours.map((workHour) => ({
              ...workHour, // Spread the existing properties
              job: newOption // Update the job property
            }))
          );
        }
      */


      setNewOption(""); // Clear the input field
      console.log("new job added");
       
      }
    }

    if(type==="job"){
      if (value === "New Item") {
       updatedWorkHours[index]["showNew"] = true;
       console.log(" job input empty");
 
      }
      else if (value === "Add Job") {
        newJob(); 
        console.log(value);
       } 
      else if(true){
       updatedWorkHours[index]["job"] = value;
       console.log("select existing job");
       console.log("job value=",value);
       setJobNames((prevOptions) => {   //reorder new job to top of list
      const selected = prevOptions.find((option) => option === value);
      const remainingOptions = prevOptions.filter((option) => option !== value);
      return [selected, ...remainingOptions];
      
    });
    }
   } 
  console.log(workHours[index].job);
  setWorkHours(updatedWorkHours);
  };

  
  const handleWeekChange = (chosenWeek) => 
    {
    chosenWeek==="last week" ? setChangeWeek(-6): setChangeWeek(1);
    };


  const totalWeeklyHours = workHours.reduce(
    (total, day) => total + calculateTotalHours(day.start, day.end),
    0
  );

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

  const [reg,ot] = weekTotal(workHours);
  const [newOption, setNewOption] = useState(""); // State for new option input
 
  

  const inputRef = useRef(null);

  const openJobBox = (targetIndex) => {
    const updatedDaysOfWeek = workHours.map((item, index) =>
    index === targetIndex ? { ...item, showNew: true } : item );
    setWorkHours(updatedDaysOfWeek);
    console.log("open job box")
  };

  return (
    
  <div className="input-container" >
    <select 
    style={{margin: "16px"}}
    onChange={(e)=>handleMenu(e.target.value) } className="cool-time-select">
    <option value = "New Item"  >
        Menu
        </option>
       
        <option value={"clear jobs"}>
        Clear Jobs
        </option>
        <option value={"clear hours"}>
        Reset Hours
        </option>
          </select>
    <span  className="cool-header"> 
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
 <button 

onClick={(e) => handleJobChange(index,"job","New Item")}
  /*
setWorkHours(
  daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showNew: index < 1 ?true:false }))  
)}*/
  
>
  New Job
   </button>
 

 {/*------------- Pop-up Input ----------------------*/}

  {workHours[index].showNew === true ? (
        <div>
           {console.log("pop-up open")}
          <input className="cool-input" ref={inputRef}
            type="text"
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="new job name"
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
              handleJobChange(index,"job","Add Job"); }
            }   // console.log("key=",e.key," ",newOption)
           }
            //onClick={(e) => handleJobChange(index,"job","New Item")}
            onBlur={(e) => {
              handleJobChange(index,"job","Add Job");
              console.log("onblur");
            }}
            autoFocus
          />
        </div>
      ):(
        
               // {/*  select job    */}
               

                <select  
                className="cool-input"// 
                value={workHours[index].job}
                onFocus={() => jobNames.length === 0?openJobBox(index):console.log(jobNames.length," jobs exist")}
                onChange={(e) => handleJobChange(index, "job", e.target.value)}
              >
               {jobNames.map((job, indx) => (
              <option  key={indx} value={job}>
                {job}
              </option>))}
             
              </select> 
              
       )
       }


       <select  className="cool-time-select"// style={{ marginRight: "0px" }} 
        value={workHours[index].start}
        onChange={(e) => handleChange(index, "start", e.target.value)}
        >
         {timeOptions.map((time, indx) => (
        <option  key={indx} value={time}>
          {time}
        </option>
      ))}
        </select>         
          <select className="cool-time-select" //style={{ marginRight: "0px" }} 
        value={workHours[index].end}
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
     
  
  
   
   {/*  plain txt for sms output   */}

     
      <a  style={{  display:"flex", justifyContent:"center", alignItems: "center"}} onClick={setraw}    href={`sms:?&body=${encodeURIComponent(rawText)}`}>
          share timecard via text message
        </a>
          <div  className="blue" ref={textRef} >         
        {plainText(workHours,changeWeek)}        
         </div>

  </div>
);


};


export default WorkHoursTracker;
