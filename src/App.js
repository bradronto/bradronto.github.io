
import React from "react"

import WorkHoursTracker from "./components/work-hours"
//import Fix from "./components/input-fix"
//import SupaBrad from "./components/data"
//import UpdateInput from "./components/data1"


export default function App(){

  return(
<div>

    <WorkHoursTracker />
 



</div>



  )
}


/*
import { useEffect, useState } from "react";
  import { createClient } from "@supabase/supabase-js";
  import WorkHourTracker from "./components/dates"
  const supabase = createClient("https://grsilsogurusppiuthls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyc2lsc29ndXJ1c3BwaXV0aGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjYzNDksImV4cCI6MjA1ODYwMjM0OX0.DKpZpAZgQ6I8XlHZad4YvsT1c-vZUNYWKsT-GuxjsNs");
  
  function App() {
   
    const [workhours, setWorkHours] = useState([]);

     const [jobName, setJobName] = useState("");
      const [startTime, setStartTime] = useState("");
      const [endTime, setEndTime] = useState("");
    

   

    useEffect(() => {
      getWorkhours();
    }, []);

    
    

    async function getWorkhours() {
      const { data } = await supabase.from("workhours").select();
      setWorkHours(data);
    }

    const deleteData = async () => {
      const { data, error } = await supabase
      .from("workhours")
      .delete()
      .eq("jobname", "flugabone");
      
  
    if (error) {
      console.error(error);
    } else {
      console.log("Data added:", data);
    }

    }

    const addData = async () => {
      const { data, error } = await supabase
        .from("workhours")
        .insert([{ jobname: "stuffed pickles" }]);
    
      if (error) {
        console.error(error);
      } else {
        console.log("Data added:", data);
      }
    };
    

    return (
      
     
      <div>

      <ul>
     

       {workhours.map((workhour) => (
         <li key={workhour.id}>{workhour.id} {workhour.jobname} {workhour.end} </li>
       ))}
       </ul>
        <h3>Insert a New Time Entry</h3>
      
     
        <button onClick={addData}>Add Data</button>
        <button onClick={deleteData}>Delete Data</button>

      <WorkHourTracker />
      

      </div>
    );
  }

  export default App;
*/

/*
    {instruments.map((instrument) => (
      <li key={instrument.name}>{instrument.name}</li>
    ))}
 */ 

  