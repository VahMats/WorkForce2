import React, { useEffect, useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import Navbar from "../Navbar/Navbar";
import UserList from "../UsersList/UserList";
import TeamList from "../TeamList/TeamList";
import Loading from "../Loading/Loading"

import "./Home.css";

export const AllData = React.createContext({});

function Home() {

    const [data, setData] = useState({
        userInfo: {},
        usersInfo: [],
        teamsInfo: [],
    });
    const [loading, setLoading] = useState(true);
    const [whichDashboard, setWhichDashboard] = useState("welcome")

    const getDataWithToken = () => {
        fetch('/token', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.token
            }
        }).then(res => res.json()).then(data => {
            setData(data);
            console.log(data)
            setLoading(false)
        })
    }

    useEffect(getDataWithToken, [])

    if (loading) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <main>
                <div className='asd'>
                    <Navbar data={data.userInfo} />
                    <div className="container">
                        <AllData.Provider value={{ data, setData }} >
                            <UserProfile setWhichDashboard={setWhichDashboard} />

                            <div className="home-main" style={{ display: whichDashboard === "welcome" ? "" : "none" }}>
                                <h1>Welcome home, {data.userInfo.firstName}</h1>
                                <div className="home-news">
                                    <h3>What's happening at the company</h3>
                                    <div className="home-news-table"> You don't have any news at this moment...</div>
                                </div>
                            </div>
                            <div className="dashboard">
                                <UserList visible={whichDashboard === "user" ? "" : "none"} />
                                {data.userInfo.isAdmin ? <TeamList visible={whichDashboard === "team" ? "" : "none"} /> : null}
                            </div>
                        </AllData.Provider>
                    </div>
                </div>
            </main>
        );
    }
}

export default Home;