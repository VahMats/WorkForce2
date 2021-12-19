import React, {useContext, useEffect, useState} from "react";
import UserProfile from "../UserProfile/UserProfile";
import Navbar from "../Navbar/Navbar";
import UserList from "../UsersList/UserList";
import TeamList from "../TeamList/TeamList";

import "./Home.css";

export const AllData = React.createContext({});

function Home() {

    const [data, setData] = useState();
    const [loading,setLoading] = useState(true);
    const [whichDashboard, setWhichDashboard] = useState("welcome")

    const getDataWithToken = async () => {
        await fetch('/token', {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "x-access-token": localStorage.token
            }
        }).then(res=>res.json()).then(data=>{
            setData(data);
            console.log(data)
            setLoading(false)
        })
    }

    useEffect(getDataWithToken, [])

    if (loading){
        return (
            <div>Loading ...</div>
        )
    }
    else {
        return (
            <main>
                <div>
                    <Navbar data={data.userInfo} />
                    <section className="container">
                        <AllData.Provider value={data} >
                            <UserProfile setWhichDashboard={setWhichDashboard}/>

                        <div className="home-main" style={{display: whichDashboard === "welcome" ? "" : "none"}}>
                            <h1>Welcome home, {data.userInfo.firstName}.</h1>
                            <div className="home-news">
                                <h3>What's happening at the company</h3>
                                <div className="home-news-table"> You don't have any news at this moment...</div>
                            </div>
                        </div>
                            <UserList visible={whichDashboard === "user" ? "" : "none"}/>
                            <TeamList visible={whichDashboard === "team" ? "" : "none"}/>
                        </AllData.Provider>
                    </section>
                </div>
            </main>
        );
    }
}

export default Home;