import React, { useState, useRef } from "react";
import "./styles/cool.css"
import SelectWithNewItem from "./a";
import NumberInBox from "./number-in-box";








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
    firstDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+" - "+
    lastDayOfWeek.toLocaleDateString("en-us",{month: "short"})+" "+
    lastDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+" " 
     //+ lastDayOfWeek.toLocaleDateString("en-us",{year: "numeric"})
  );
 
}



const getDatesOfCurrentWeek = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+1));
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);

   // ();
  const day1 = day.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Monday"
  const month = day.toLocaleDateString("en-US", { month: "short" }); // e.g., "April"
  const date = day.getDate(); // e.g., 5
    //weekDates.push(day.toDateString()+" "); // Format the date as needed
  //weekDates.push(`{day1} :{mo}`)
  weekDates.push(`${day1} ${" "} ${date}`);

  /*
    weekDates.push(day.toLocaleDateString("en-us",{
       weekday: "short",
       month: "short",
       day: "numeric",
      
      
      }))

      */

  }

  return weekDates;
};




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
    <h1 style={{  display:"flex", justifyContent:"center", alignItems: "center"}}className="cool-header"> {getMonth()} &nbsp; &nbsp;&nbsp;&nbsp; {totalWeeklyHours.toFixed(1)} hrs</h1>
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
      </div>
  </div>
);
};

/*
const NumberInBox = props => {
  const [day,date] = props.day.split("   ")
  return (
    <div style={{
      marginTop: "0px",
      display: "inline-block",
      padding: "2px",
      border: "2px solid #000000",
      //borderColor: "black",
      //borderWidth: "4px",
      borderRadius: "8px",
      textAlign: "center",
      height: "45px",
      width: "45px",
      fontSize: "17px",
      backgroundColor:"rgb(252, 247, 174)" ,
      color: "black"
    }}>
      {day} <br />{date}
    </div>
  );
};
*/

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