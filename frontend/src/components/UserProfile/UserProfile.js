import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";
import {AllData} from '../Home/Home'
import "./UserProfile.css";


function UserProfile() {

    const data = useContext(AllData)

    return (
        <>
            <nav className="user-main">
                <div className="user-main-profile">
                    <img alt = "person"
                         src={data.userInfo.gender === "male" ? ManIcon : WomanIcon}
                    />
                    <div className="user-main-info">
                        <ul>
                            <li> {data.userInfo.firstName + " " + data.userInfo.lastName} </li>
                            <li>{data.userInfo.email}</li>
                            <li>{data.userInfo.dateOfBirth}</li>
                        </ul>
                            </div>
                            <NavLink activeClassName="active-link" to="/userslist">
                                <li>{data.userInfo.isAdmin ? "User List" : data.userInfo.team}</li>
                            </NavLink>
                            {data.userInfo.isAdmin ? <NavLink activeClassName="active-link" to="/teamlist">
                                <li>Team List</li>
                            </NavLink> : null}
                    </div>
            </nav>
        </>
    );
}

export default UserProfile;