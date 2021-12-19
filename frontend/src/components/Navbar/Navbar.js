import React, {useContext, useEffect, useState} from "react";
import Logo from "../../images/logo.svg";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./Navbar.css";
import { MenuItem } from "@mui/material";
import User from "../../../../backend/Schema/UserSchema";
// import { HomeContext } from "../App"



const Navbar = ({data}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.token = "";
        window.location.reload();
    };

    return (
        <header className = "header">
            <div className="navbar">
                <div className="logo">
                    <img src={Logo} alt="CompanyLogo" />
                    <h1 className="text">Internal tool</h1>
                </div>
                <div className="usericon">
                    <p className="text">{data.username}</p>
                    <img alt ="person"
<<<<<<< HEAD
                         src={userData.gender == "male" ? ManIcon userData.gender == "female" ? WomanIcon}
=======
                         src={data.gender === "male" ? ManIcon : WomanIcon}
>>>>>>> 9584d3fb18f66eebd6891ad62947eac658773674
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