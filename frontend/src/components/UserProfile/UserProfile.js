import React, {useContext, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";
import {AllData} from '../Home/Home'
import "./UserProfile.css";


function UserProfile({setWhichDashboard}) {

    const data = useContext(AllData)

    return (
        <>
            <nav className="user-main">
                <div className="user-main-profile">
                    <img alt="person"
                         src={data.userInfo.gender === "male" ? ManIcon : WomanIcon}

                    />
                    <div className="user-main-info">
                        <ul>
                            <li onClick={e=>{setWhichDashboard("welcome")}}> {data.userInfo.firstName + " " + data.userInfo.lastName} </li>
                            <li>{data.userInfo.email}</li>
                            <li>{data.userInfo.dateOfBirth}</li>
                        </ul>
                    </div>
                    <NavLink activeClassName = "used-link" to='/userlist' >
                        <li onClick={e=>{setWhichDashboard("user")}}>{data.userInfo.isAdmin ? "Users List" : data.userInfo.team}</li>
                    </NavLink>
                    {data.userInfo.isAdmin ?<NavLink activeClassName= "used-link" to='/teamlist' >
                        <li onClick={e=>{setWhichDashboard("team")}}>Team List</li>
                        </NavLink>
                        : null}
                </div>
            </nav>
        </>
    );
}

export default UserProfile;