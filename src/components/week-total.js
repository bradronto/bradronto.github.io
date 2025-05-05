import calculateTotalHours from "./total-hours";

const weekTotal = (workHours) => 
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

    export default weekTotal;