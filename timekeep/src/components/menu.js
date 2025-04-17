import React,{useEffect,useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import getMonth from "./date-header";
//import handleWeekChange
import plainText from "./plain-txt";

const ProMenu = (props) => {

     const [jobNames,setJobNames] = useState(() => {
        // Load session data if available
        const savedData = localStorage.getItem("jobNames");
        return savedData
          ? JSON.parse(savedData)
          :
          []  });
    

   useEffect(() => {
      // Save workHours to sessionStorage whenever it changes
      localStorage.setItem("jobNames", JSON.stringify(jobNames));
    }, [jobNames]
  ); 


    const smsText = () => {
        const rawHTML = plainText(props.workHours,props.changeWeek);
        const convertedText = rawHTML
        .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
        .replace(/\.\s*\./g, "") // Remove consecutive dots if any
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/&nbsp;/g, "");
       // setRawText(convertedText);
        return convertedText;
       }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearJobs =()=>{

    setJobNames([])
  }
const r = ["jik","gut","cax"];


  const share =()=>{
    const selectedHref = `sms:?&body=${encodeURIComponent(props.smsText)}` // Get the URL from the option value
    if (selectedHref) {
      window.location.href = selectedHref; // Navigate to the selected URL
    }

  }

  return (
    <AppBar position="static" style={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
        &nbsp;Weekly Time Card
        <br />

          <select 
       className="cool-date-header"
       //onChange={(e) => handleClick(e)}
      >
        <option value="this week">
        {getMonth(-6)} 
        </option>
        <option value="last week">
        {getMonth(1)}
        </option>
      </select>
      

        </Typography>
        
       

       
        <Button
           //variant="contained"
           sx={{ 
             fontSize: '50px',  // or '1.5rem' or 'large'
            // color: "inherit"
           }}
          color="inherit"
          onClick={handleClick}
        >
          ...
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=>{handleClose();share(); }}>Share</MenuItem>
          <MenuItem onClick={handleClose}>Reset Week</MenuItem>
          <MenuItem onClick={()=>{handleClose();clearJobs();}}>Clear Jobs</MenuItem>

         {jobNames.map((j)=>(<MenuItem>{j}</MenuItem>))}
        </Menu>
      </Toolbar>
     
    </AppBar>

    
    
  );
};

export default ProMenu;
