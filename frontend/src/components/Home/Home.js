import React, { useContext } from "react";
import "./Home.css";
import UserProfile from "../UserProfile/UserProfile";
import Navbar from "../Navbar/Navbar";
// import { HomeContext } from "../App";

function Home() {
//   const { userData } = useContext(HomeContext);
  return (
    <main>
      <div>
        <Navbar />
        <section className="container">
          {/* <h1>Welcome Home, {userData.username}</h1> */}
           <UserProfile />
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

export default Home;