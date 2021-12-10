import Navbar from './components/Navbar.js/Navbar';
import { createContext, useState, useEffect } from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegPage from "./components/RegPage";

function App() {
  return (
    <Navbar />
  );
}

export default App;
