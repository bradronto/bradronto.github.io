import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import getMonth from "./date-header";
//import handleWeekChange

const ProMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Weekly Time Card

          <br />

          <select 
       className="cool-date-header"
       //onChange={(e) => handleClick(e)}
      >
        <option value="this week">
        {getMonth(1)} 
        </option>
        <option value="last week">
        {getMonth(-6)}
        </option>
      </select>
      

        </Typography>
        
       

       
        <Button
          color="inherit"
          onClick={handleClick}
        >
          Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Share</MenuItem>
          <MenuItem onClick={handleClose}>Reset Week</MenuItem>
          <MenuItem onClick={handleClose}>Clear Jobs</MenuItem>
        </Menu>
      </Toolbar>
     
    </AppBar>

    
    
  );
};

export default ProMenu;
