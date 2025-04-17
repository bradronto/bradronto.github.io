import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
          Weekly Time Card<br />
            Apr 7 - Apr 13     40 HRS   0.5 OT
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
