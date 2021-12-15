import React, {useContext, useEffect, useState} from "react";
import "./Home.css";
import UserProfile from "../UserProfile/UserProfile";
import Navbar from "../Navbar/Navbar";
// import { HomeContext } from "../App";

function Home() {

    const [data, setData] = useState();
    const [loading,setLoading] = useState(true);

    const getDataWithToken = async () => {
        await fetch('/token', {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "x-access-token": localStorage.token
            }
        }).then(res=>res.json()).then(data=>{
            setData(data);
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
                    <Navbar/>
                    <section className="container">
                        {/* <h1>Welcome Home, {userData.username}</h1> */}
                        <UserProfile/>
                        <div className="home-main">
                            <h1>Welcome home, Lilith.</h1>
                            <div className="home-news">
                                <h3>What's happening at the company</h3>
                                <div className="home-news-table"> You don't have any news at this moment...</div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
}

export default Home;