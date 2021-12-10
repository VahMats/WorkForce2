import React, {useContext, useEffect, useState} from "react";
import Logo from "../../images/logo.svg";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./Navbar.css";
import { MenuItem } from "@mui/material";
// import { HomeContext } from "../App"

 

const Navbar = () => {
    //   const { userData } = useContext(HomeContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
    const logOut = () => {
    // handleSetToken("");
    // setUserData({});
    };
    
  return (
    <header className = "header">
          <div className="navbar">
        <div className="logo">
                  <img src={Logo} alt="CompanyLogo" />
                  <h1>Mamble</h1>
              </div>
              <div className="usericon">
                  <p>Lilith Mnatsakanian</p>
                <img alt ="person"
                    src={ManIcon}
                  />
                  <div>
                  <ArrowDropDownIcon onClick={handleMenu}></ArrowDropDownIcon>
                     <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
            <MenuItem onClick={logOut}>Log out</MenuItem>
            </Menu>
          </div>
              </div>
              </div>
    </header>
  );
}

export default Navbar;