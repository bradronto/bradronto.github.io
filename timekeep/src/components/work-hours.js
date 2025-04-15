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

  const inputRef = useRef(null);

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
        daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showNew: false, showFix: true }))
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


const handleMenu = (value) =>
  {
    if (    value ==="dont kjhkjh"  )
    {} else

  if (    value ==="clear jobs"  )
    {setJobNames([]); } else

  if (    value ==="clear hours"  )
    {

      setTimeout(() => {
        
      
      setWorkHours(
        daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showFix: true, showNew: index < 1 ?true:false }))
        )}, 900)
      
    } else
    if (    value ==="share"  ) {
    
      const selectedHref = `sms:?&body=${encodeURIComponent(rawText)}` // Get the URL from the option value
      if (selectedHref) {
        window.location.href = selectedHref; // Navigate to the selected URL
      }
    };



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
  


  const handleJobChange = (index, type, value, e) => 
  {
    const updatedWorkHours = [...workHours];
    //e.preventDefault();
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


      setNewOption(""); // Clear the input field
      console.log("new job added");
       
      }
    }

    if(type==="job"){
      if (value === "New Item") {
       // setTimeout(() => {updatedWorkHours[index]["showNew"] = true;}, 100);
       updatedWorkHours[index]["showNew"] = true;

       setTimeout(() => {
        if(inputRef.current){inputRef.current.focus()};
      }, 700);
      
     
     
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
 

  const [reg,ot] = weekTotal(workHours);
  const [newOption, setNewOption] = useState(""); // State for new option input
 
  

 
  const openJobBox = (targetIndex) => {
    const updatedDaysOfWeek = workHours.map((item, index) =>
    index === targetIndex ? { ...item, showNew: true } : item );
    setWorkHours(updatedDaysOfWeek);
    console.log("open job box")
    setTimeout(() => {
      if(inputRef.current){inputRef.current.focus()};
    }, 800)
  };


  const handleKeyboardToggle = () => {
    const hiddenInput = document.createElement("input");
    hiddenInput.style.position = "absolute";
    hiddenInput.style.opacity = 0;
    document.body.appendChild(hiddenInput);
    hiddenInput.focus();
    setTimeout(() => {
      hiddenInput.blur();
      document.body.removeChild(hiddenInput);
    }, 100); // Adjust timing as needed
  };
  



  return (
    
  <div className="input-container" >
    <select  className="cool-menu" style={{backgroundColor: "blue"}}
    style={{margin: "16px"}}
    onChange={(e)=>handleMenu(e.target.value) }
    onClick={setraw}
    
    
    >
    <option value = "New Item" style={{backgroundColor: "blue"}} >
        ...
        </option>
       
        <option value={"clear jobs"}>
        Clear Jobs
        </option>
       
        <option value={"share"}>
        Share
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

{workHours[index].showFix === false? (

 <button onClick={(e) => handleChange(index,"showFix",false)}
  className="cool-input"
  >
 {workHours[index].job}
   </button>
):(

 <>
                  {/*  select job    */}

  {workHours[index].showNew === true? (
        <div>
           {console.log(newOption,workHours[index].showNew)}
          <input className="cool-input" ref={inputRef}
            type="text"
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="new job name"
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
              handleJobChange(index,"job","Add Job",); }
            }   // console.log("key=",e.key," ",newOption)
           }
            //onClick={(e) => handleJobChange(index,"job","New Item")}
            onBlur={(e) => {
            
              handleJobChange(index,"job","Add Job",e);
              console.log("onblur");
            }}
            //autoFocus
          />
        </div>
      )  : (
        
               // {/*  select job    */}
               

                <select  
                className="cool-input"// 
                value={workHours[index].job}
                onFocus={() => jobNames.length === 0?openJobBox(index):console.log(jobNames.length," jobs exist")}
                onChange={(e) => {
                  //return;
                  handleJobChange(index, "job", e.target.value,e);
                  
                
                }}
              >
               {jobNames.map((job, indx) => (
              <option  key={indx} value={job}>
                {job}
              </option>))}
              <option value={"New Item"}>New Job</option>
             
             
              </select> 
              
       ) }
     </> )}

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

     
 
          <div  className="blue" ref={textRef} >         
        {plainText(workHours,changeWeek)}        
         </div>

  </div>
);


};


export default WorkHoursTracker;



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


             <a  style={{  display:"flex", justifyContent:"center", alignItems: "center"}} onClick={setraw}    href={`sms:?&body=${encodeURIComponent(rawText)}`}>
          share timecard via text message
        </a>
      */
