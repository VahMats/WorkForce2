import Navbar from './components/Navbar.js/Navbar';
import { createContext, useState, useEffect } from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegPage from "./components/RegPage";
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  return (
    <Router>
  <div>
    <Navbar/>
    <Switch>
      <UserProfile />
    </Switch>
  </div>
</Router>
  );
}

export default App;
