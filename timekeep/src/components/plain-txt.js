
import getMonth from "./date-header";
import calculateTotalHours from "./total-hours";
import weekTotal from "./week-total";
import getDatesOfCurrentWeek from "./current-week";



 



const plainText = (workHours,changeWeek) => {

    const daysOfWeek = getDatesOfCurrentWeek(changeWeek);  //chgwk is 1 for this week and -6 for last
 

    const [reg,ot] = weekTotal(workHours);

    return(

<div  className="blue"  >  
        
        {getMonth(changeWeek)}      {/*  date range header     */}
        <br></br>
        <span>{reg} HOURS  <br />{ot} OVERTIME </span>
        <br></br><br />
        {daysOfWeek.map((day, index) => (
        <div   key={index}  >
          {workHours[index].isChecked ? (// only show hours for checked days
        <><span style={{ marginLeft:"0px"}}>{daysOfWeek[index]}</span>
          <br />{workHours[index].job} <br></br>{/*   job name    */}
             <span  className="indent">{workHours[index].start}-{workHours[index].end} <br></br>
            {index<5?(
                <>
        
                {calculateTotalHours(workHours[index].start, workHours[index].end)>8?8:calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)} Hrs
                &nbsp;&nbsp;{calculateTotalHours(workHours[index].start, workHours[index].end)>8?calculateTotalHours(workHours[index].start, workHours[index].end).toFixed(1)-8:0} OT
           
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
              NO HOURS
               <br /><br />
              </>
            )}
        
            </div>
         ))}
               
            
        
               <br />
          </div>
        
    
    )


}
export default plainText;


