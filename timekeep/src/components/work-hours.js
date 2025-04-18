import React, { useState, useRef, useEffect } from "react";
import "./styles/cool.css";
import NumberInBox from "./number-in-box";
import generateTimeOptions from "./time-select";
//import getMonth from "./date-header";
import getDatesOfCurrentWeek from "./current-week";
import calculateTotalHours from "./total-hours";
import weekTotal from "./week-total";
import plainText from "./plain-txt";
import Select from "react-select";
import ProMenu from "./menu";
//import CapitalizeWords from "./capitalize"
//import CapitalizeWords from "./capitalize";
import _ from "lodash";

const CapitalizeWords = ( text ) => {
  const capitalizedText = _.startCase(_.toLower(text));
  return capitalizedText;
};



const WorkHoursTracker = () => {

  const inputRef = useRef(null);

  //const [isFirstRun, setIsFirstRun] = useState(true);
 
  const [changeWeek, setChangeWeek] = useState(1);
  const daysOfWeek = getDatesOfCurrentWeek(changeWeek);  //chgwk is 1 for this week and -6 for last
 
  const [jobNames,setJobNames] = useState(() => {
    // Load session data if available
    const savedData = localStorage.getItem("jobNames");
    return savedData
      ? JSON.parse(savedData)
      :
      []  });


  const [jobOptions, setJobOptions] = useState(()=> {
    return jobNames
    ? [...jobNames.map(
      (jobname)=> ({value:jobname, label:jobname} )),
      { value: "New Item", label: "New Job 🍎" },]
    : [{ value: "New Item", label: "New Job 🍎" },]
  }
  
  );

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
    // Save jobNames to sessionStorage whenever it changes
    localStorage.setItem("jobNames", JSON.stringify(jobNames));
  }, [jobNames]
);


useEffect(() => {
  if (workHours.length > 0) {
    updateSmsText();
  }
}, [workHours]); // Dependency: Runs only when workHours changes


useEffect(() => {
  const handleStorageChange = () => {
    const savedData = localStorage.getItem("jobNames");
    if (savedData) {
      setJobNames(JSON.parse(savedData));
    }
  };

  // Add event listener
  window.addEventListener('storage', handleStorageChange);

  // Clean up event listener on unmount
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);



const textRef = useRef();

const [rawText, setRawText] = useState("wtf");

useEffect(()=>{
  if(textRef.current){
    const rawHTML = textRef.current.innerHTML;
    const convertedText = rawHTML
    .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
    .replace(/\.\s*\./g, "") // Remove consecutive dots if any
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/g, "");
    setRawText(convertedText);
  }
}, []);



/*
const [rawText, setRawText] = useState(() => {
  const rawHTML = textRef.current.innerHTML;
  const convertedText = rawHTML
  .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
  .replace(/\.\s*\./g, "") // Remove consecutive dots if any
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/&nbsp;/g, "");
  setRawText(convertedText);
  return convertedText;
}


);
  
*/


//const [rawText, setRawText] = useState("wtf");
  
const updateSmsText = () => {
 const rawHTML = textRef.current.innerHTML;
 const convertedText = rawHTML
 .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
 .replace(/\.\s*\./g, "") // Remove consecutive dots if any
 .replace(/<br\s*\/?>/gi, "\n")
 .replace(/&nbsp;/g, "");
 setRawText(convertedText);
 //return rawText;
}


/*

const handleMenu = (e) =>
  {
    if (    e.value ==="dont kjhkjh"  )
    {} else

  if (    e.value ==="clear jobs"  )
    {setJobNames([]); 
      setJobOptions(  [{ value: "New Item", label: "New Job 🍎", }]);
      openJobBox(0);

    } else

  if (    e.value ==="clear hours"  )
    {

      setTimeout(() => {
        
      
      setWorkHours(
        daysOfWeek.map((item,index) => ({ start: "7:00 AM", end: index<5 ? "3:00 PM":"7:00 AM", job: "Lake Mariner", isChecked: index < 5 ?true:false, showFix: true, showNew: index < 1 ?true:false }))
        )}, 900)
      
    } else
    if (    e.value ==="share"  ) {
    
      const selectedHref = `sms:?&body=${encodeURIComponent(rawText)}` // Get the URL from the option value
      if (selectedHref) {
        window.location.href = selectedHref; // Navigate to the selected URL
      }
    } else

    if (    e.value ==="new job"  ) {
    
    console.log("new job from menu not finished");
    



  }
  }
*/

 const handleChange = (index, type, value) => 
 {
  const updatedWorkHours = [...workHours];
  updatedWorkHours[index][type] = value;

  if (    type ==="isChecked"  )
    {
    updatedWorkHours[index]["isChecked"] === false? updatedWorkHours[index]["end"] = "7:00 AM":updatedWorkHours[index]["end"]="3:00 PM"
  }
  setWorkHours(updatedWorkHours);
 // setraw();
 updateSmsText();
 }
  
  const handleJobChange = (index, value, e) => 
  {

    
    const updatedWorkHours = [...workHours];
    
   
    const newJob = () => {

      {/*  add job to job names */}
      if(newOption===""){
        updatedWorkHours[index].showNew = false;
        console.log("no option entered")
          } 
          
          else if (newOption.trim() && !jobNames.includes(newOption)) // new job name was entered
            {
              const newOption1 = CapitalizeWords(newOption);
        //const newOption1 = newOption.toUpperCase();
       // setNewOption(newOption.toUpperCase())      
        updatedWorkHours[index].job = newOption1; //add job
        setJobNames([...jobNames, newOption1]);
        jobNames.length>=1?
        setJobOptions([{value:newOption1, label:newOption1},...jobOptions]):
        setJobOptions([{value:newOption1, label:newOption1},...[{ value: "New Item", label: "New Job 🍎" },]])
        updatedWorkHours[index].showNew = false;
 
        if(jobNames.length===0){
          console.log("spread the jobs");
          updatedWorkHours.map((record)=>{record.job = newOption1}
        ) }


      setNewOption(""); // Clear the input field
      console.log("new job added");
       
      }
    }

    if(true){
      if (e.value === "New Item") {
       updatedWorkHours[index]["showNew"] = true;

      {/*
       setTimeout(() => {
        if(inputRef.current){inputRef.current.focus()};
      }, 700);

      */}

       console.log(" job input empty");
 
      }
      else if (value === "Add Job") {
        newJob(); 
        console.log(e.value);
       } 
      else {
       updatedWorkHours[index]["job"] = e.value;
       console.log("select existing job");
       console.log("job value=",e.value,e.label,e.select);

   /*    
       setJobNames((prevOptions) => {   //reorder new job to top of list
      const selected = prevOptions.find((option) => option === value);
      const remainingOptions = prevOptions.filter((option) => option !== value);
      return [selected, ...remainingOptions];
      
    });

    */
    }
   } 
  console.log(workHours[index].job);
  setWorkHours(updatedWorkHours);
  //setraw();
  updateSmsText();
  };

  /*
  const handleWeekChange = (chosenWeek) => 
    {
    chosenWeek==="last week" ? setChangeWeek(-6): setChangeWeek(1);
    };


  const totalWeeklyHours = workHours.reduce(
    (total, day) => total + calculateTotalHours(day.start, day.end),
    0
  );

  */

  const timeOptions = generateTimeOptions();
  const [reg,ot] = weekTotal(workHours);
  const [newOption, setNewOption] = useState(""); // State for new option input

  const openJobBox = (targetIndex) => {
    const updatedDaysOfWeek = workHours.map((item, index) =>
    index === targetIndex ? { ...item, showNew: true } : item );
    setWorkHours(updatedDaysOfWeek);
    console.log("open job box")
   };

  return (
    
  <div className="input-container" >
    
    <ProMenu 
 //workHours={workHours}
 //setWorkHours={setWorkHours}
 jobNames={jobNames}
 setJobNames={setJobNames}
 //changeWeek={changeWeek}
 smsText={(rawText)}
   />

    <span  className="cool-header"> 
        {reg} HOURS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ot} OVERTIME  {/*totalWeeklyHours.toFixed(1)*/} 
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
          className="custom-checkbox"
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
 
                  {/*  new job popup   */}

  {workHours[index].showNew === true? (
        <div>
           {console.log(newOption,workHours[index].showNew)}
          <input className="cool-input" ref={inputRef}
            type="text"
            onChange={(e) => setNewOption(e.target.value.toUpperCase())}
            placeholder="new job name"
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
              handleJobChange(index,"Add Job",e); }
            }   // console.log("key=",e.key," ",newOption)
           }
             onBlur={(e) => {
              handleJobChange(index,"Add Job",e);
              console.log("onblur");
            }}
            autoFocus
          />
        </div>
      )  : (
        
 // {/*  select job    */}
               
               <Select 

               styles={{
                
                control: (base)=>({
               ...base,
                border:"2px solid #000",
                borderRadius: "8px",
                boxShadow:"none",
                marginBottom:"5px",
                fontWeight: "bold"
               }),

               placeholder: (base) => ({
                ...base,
                color: "#000", // Change placeholder color to black
                fontWeight: "bold", // Make placeholder text bold
                fontSize: "16px", // Increase font size
              }),

              menu: (base) => ({
                ...base,
                color: "#000", // Change placeholder color to black
                fontWeight: "bold", // Make placeholder text bold
                fontSize: "16px", // Increase font size
              }),

              
            
              }}
               
                isSearchable={false}
                noOptionsMessage={"no options"}
                //controlShouldRenderValue={true}
                placeholder={workHours[index].job}
                value={workHours[index].job}
                onFocus={() => jobNames.length === 0?openJobBox(index):console.log(jobNames.length," jobs exist")}
                onChange={(e) => { handleJobChange(index, "job",e);  }}
                options={jobOptions}
              
              >

              </Select>  
       ) }
    

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
          <select className="cool-time-select" style={{ marginLeft: "2%" }} 
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
          <p className="cool-span"> NO HOURS   </p> 
        </>
      )}
        </div>     
          </td> <td style={{marginBottom: "0px", alignContent:"baselines", verticalAlign:"top"}}>
          <span style={{  marginBottom: "0px", alignContent:"baselines" }}>
           {    //index<5?( // is it a weekday?
            workHours[index].isChecked && (
            <>
           
           {calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)>8? 8 : calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)}
            
            <br /> 

            {calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)>8? calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)-8:0}

            </>
           )}
           </span>
           </td></tr></tbody></table>
       ))}
      
   {/*  sms output   */}

          <div className="blue" ref={textRef} >         
        {plainText(workHours,changeWeek)}        
         </div>

  </div>
);

};


export default WorkHoursTracker;
