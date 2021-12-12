import React, { useContext, useState } from "react";
import "./UserProfile.css";
// import { HomeContext } from "../App";
import { Link, NavLink } from "react-router-dom";

import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";

function UserProfile() {
  // const { handleSetToken, setUserData } = useContext(HomeContext);

  return (
    <>
      <nav className="user">
        <div className="user-profile">
         <img alt = "person" 
                src={
                 WomanIcon
                }
          />
          <ul>
            <li>  Lilith Mnatsakanian </li> 
            <li>  Mamble </li> 
            {/* {userData.isAdmin ? "Dashboard" : userData.teamName} */}
            <li>  21.12.1995 </li> 
          </ul>
          </div>
<div className="user-links">
        <ul>
          <NavLink activeClassName="active-link" to="/userslist">
            <li>User List</li>
          </NavLink>
          <NavLink activeClassName="active-link" to="/teamlist">
            <li>Team List</li>
          </NavLink>
          </ul>
          </div>
      </nav>
    </>
  );
}

export default UserProfile;