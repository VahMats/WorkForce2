import React, {useContext, useEffect, useState} from "react";
import "./Home.css";
import UserProfile from "../UserProfile/UserProfile";
import Navbar from "../Navbar/Navbar";
import UserList from "../UsersList/UserList";

export const AllData = React.createContext({});

function Home() {

    const [data, setData] = useState();
    const [loading,setLoading] = useState(true);
    const [whichDashboard, setWhichDashboard] = useState("on one")

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
                    <Navbar data={data.userInfo}/>
                    <section className="container">
                        <AllData.Provider value={data} >
                            <UserProfile/>

                        <div className="home-main">
                            <h1>Welcome home, {data.userInfo.firstName}.</h1>
                            <div className="home-news">
                                <h3>What's happening at the company</h3>
                                <div className="home-news-table"> You don't have any news at this moment...</div>
                            </div>
                        </div>
                            <UserList />
                            {/*<TeamList />*/}
                        </AllData.Provider>
                    </section>
                </div>
            </main>
        );
    }
}

export default Home;