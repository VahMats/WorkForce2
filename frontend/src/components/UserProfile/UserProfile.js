import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ManIcon from "../../images/manicon.png";
import WomanIcon from "../../images/womanicon.png";
import { AllData } from '../Home/Home'
import "./UserProfile.css";


function UserProfile({ setWhichDashboard }) {

    const { data } = useContext(AllData)

    let teamName = data.userInfo.team === "-" ? "Your Team" : data.userInfo.team

    return (
        <>
            <div className="user_main">
                <div className="user_main-profile">
                    <img alt="person"
                        src={data.userInfo.gender === "male" ? ManIcon : WomanIcon}

                    />
                    <div className="user_main-info">
                        <ul>
                            <li onClick={e => { setWhichDashboard("welcome") }}> {data.userInfo.firstName + " " + data.userInfo.lastName} </li>
                            <li>{data.userInfo.email}</li>
                            <li>{data.userInfo.dateOfBirth}</li>
                        </ul>
                    </div>
                    <NavLink activeClassName="used_link" to='/userlist' >
                        <li onClick={e => { setWhichDashboard("user") }}>{data.userInfo.isAdmin ? "User List" : teamName}</li>
                    </NavLink>
                    {data.userInfo.isAdmin ? <NavLink activeClassName="used_link" to='/teamlist' >
                        <li onClick={e => { setWhichDashboard("team") }}>Team List</li>
                    </NavLink>
                        : null}
                </div>
            </div>
        </>
    );
}

export default UserProfile;