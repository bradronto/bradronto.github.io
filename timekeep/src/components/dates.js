import React, { useState, useRef } from "react";
import "./cool.css"
import SelectWithNewItem from "./a";








const generateTimeOptions = () => {
    
  const times = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0); // Set to 12:00 AM
  const end = new Date();
  end.setHours(23, 30, 0, 0); // Set to 11:30 PM

  while (start <= end) {
    const hours = start.getHours();
    const minutes = start.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    //const formattedHours = hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    times.push(`${formattedHours}:${formattedMinutes} ${period}`);
    start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
  }

  return times;
};

const getMonth = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+1));
  const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+6));

  return(

    firstDayOfWeek.toLocaleDateString("en-us",{month: "short" }  )+" "+
    firstDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+"-"+
    lastDayOfWeek.toLocaleDateString("en-us",{month: "short"})+" "+
    lastDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+" " 
     //+ lastDayOfWeek.toLocaleDateString("en-us",{year: "numeric"})
  );
 
}



const getDatesOfCurrentWeek = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+1));
  //const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+6));
  //const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek+6))
  const weekDates = [];

  for (let i = 0; i < 6; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    //weekDates.push(day.toDateString()+" "); // Format the date as needed
    weekDates.push(day.toLocaleDateString("en-us",{
       weekday: "short",
       day: "numeric",
       // month: "long",
      
      }))

  }

  return weekDates;
};




const WorkHoursTracker = () => {

/*
  const ShareViaSMS = () => {
   
  
   // const message = "Hello, this is a message sent from my React app!";
  
    const htmlElement = htmlRef.current;
    const message = htmlElement.textContent; // Retrieves only the text part of the HTML
     console.log(htmlElement); // Logs: "This is the text part"
    
   
  
  //return textContent;
  
    return (
      <div>
        
        <a href={`sms:?&body=${encodeURIComponent(message)}`}>
          share SMS
        </a>
      </div>
    );
  };
 */ 


  //const daysOfWeek = ["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14", "Sat 14"];
  const daysOfWeek = getDatesOfCurrentWeek();
  
  const [workHours, setWorkHours] = useState(
    daysOfWeek.map(() => ({ start: "7:00 AM", end: "3:00 PM", job: "Lake Mariner Data" }))
  );

  const handleChange = (index, type, value) => {
    const updatedWorkHours = [...workHours];

    updatedWorkHours[index][type] = value;
    console.log(workHours)
    console.log(value)

    setWorkHours(updatedWorkHours);
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
  //const jobName = ['Lake Mariner','Linde Niag Falls']

  const optionsArray = ["Lake Mariner Data", "Linde Niag Falls"];
 //const htmlRef =useRef();

   const textRef = useRef();
   const [rawText, setRawText] = useState("wtf");
   //const rawText = "sup";
   
   const setraw = () => {
 //   setRawText(textRef.current.textContent);

         // Get the HTML content
    const rawHTML = textRef.current.innerHTML;

    // Replace all <br> tags with \n

    const convertedText = rawHTML
    .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
    .replace(/\.\s*\./g, "") // Remove consecutive dots if any
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/g, "");
    setRawText(convertedText);

   }

   const [isChecked, setIsChecked] = useState(false);

   const handleCheckboxChange = () => {
     setIsChecked(!isChecked);
   };
 
  return (
  
  
  <div className="input-container" >


    
      <span className="cool-header"> {getMonth()} -- {totalWeeklyHours.toFixed(1)} hrs</span>

      
      {daysOfWeek.map((day, index) => (
        <table key={index} style={{ marginLeft: "10px" }}>
         <tr><td>
         <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />

            <NumberInBox day={day} color="grey" />
             <br></br>
           <span style={{ marginLeft: "10px" }}>
           {calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} 
          </span>
         
            </td>
            <td>
            
          <table><tr><td>

            <SelectWithNewItem  myArray={optionsArray} />
         <select  className="cool-time-select"// style={{ marginRight: "0px" }} 
          defaultValue={timeOptions['14']}
          //defaultValue={workHours[index].start}
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
           </td></tr></table>
         
          </td> </tr> 
          </table>
      ))}
      <br></br>
      <a  onClick={setraw}    href={`sms:?&body=${encodeURIComponent(rawText)}`}>
          share SMS
        </a>
     <div className="blue" ref={textRef} >
        <br></br>
     Brad Ronto :<br /> {getMonth()}  
    <br></br><br></br>
    {daysOfWeek.map((day, index) => (
    <div className="blue" key={index}  >
         &nbsp; --- {daysOfWeek[index]} ---<br></br> {workHours[index].job} <br></br>
          <span  className="indent">
           {workHours[index].start}-{workHours[index].end} <br></br>
           &nbsp; &nbsp; {calculateTotalHours(workHours[index].start, workHours[index].end)>8?8:calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} Hrs
          &nbsp; &nbsp; {calculateTotalHours(workHours[index].start, workHours[index].end)>8?calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)-8:0} O.T.
        </span><br></br><br></br>
        </div>
     ))}
     
             <span className="blue"> &nbsp; {totalWeeklyHours.toFixed(2)>40?40:totalWeeklyHours.toFixed(2)} Hrs &nbsp;&nbsp;&nbsp; {totalWeeklyHours.toFixed(1)>40?totalWeeklyHours.toFixed(1)-40:0} OT 
             
             </span>
            

   
      </div></div>
  );
};

const NumberInBox = props => {
  return (
    <div style={{
      display: "inline-block",
      padding: "0px",
      border: "2px solid black",
      borderRadius: "15px",
      textAlign: "center",
      width: "35px",
      fontSize: "15px",
      backgroundColor: props.color,
      color: "white"
    }}>
      {props.day}
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


/*

<select className="cool-input" id="select">
      {optionsArray.map((option, index) => (
        <option key={index} value={option}    onChange={(e) => handleChange(index, "job", e.target.value)}
        >
          {option}
        </option>
      ))}
    </select>

 <select  className="cool-am-select"// style={{ marginRight: "0px" }} 
                  
          >
          
          <option >
            AM
          </option> 
          <option >
            PM
          </option>
       
          </select> 

          */