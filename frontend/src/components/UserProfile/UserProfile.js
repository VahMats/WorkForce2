import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";

import "./UserProfile.css";


function UserProfile() {

    return (
        <>
            <nav className="user-main">
                <div className="user-main-profile">
                    <img alt = "person"
                         src={
                             WomanIcon
                         }
                    />
                    <div className="user-main-info">
                        <ul>
                            <li>  Lilith Mnatsakanian </li>
                            <li>  Mamble </li>
                            {/* {userData.isAdmin ? "Dashboard" : userData.teamName} */}
                            <li>Lilith@mamble.co</li>
                            <li>  21.12.1995 </li>
                        </ul>
                            </div>
                            <NavLink activeClassName="active-link" to="/userslist">
                                <li>User List</li>
                            </NavLink>
                            <NavLink activeClassName="active-link" to="/teamlist">
                                <li>Team List</li>
                            </NavLink>
                    </div>
            </nav>
        </>
    );
}

export default UserProfile;