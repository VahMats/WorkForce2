import React from "react";
import Logo from "../../images/logo.svg";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./Navbar.css";
import { MenuItem } from "@mui/material";



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
                         src={data.gender === "male" ? ManIcon : WomanIcon}
                    />
                    <div>
                        <ArrowDropDownIcon onClick={handleMenu} />
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