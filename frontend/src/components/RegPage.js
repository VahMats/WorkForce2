import React, {useState} from "react";
import ValidationChecker from "../ValidationChecker";
import {Link, Redirect} from "react-router-dom";

export default ()=>{
    const [regPocket, setRegPocket] = useState({
        firstName:"",
        lastName:"",
        email:"",
        dateOfBirth:"",
        gender:"",
        username:"",
        password:"",
        confirmPassword:""
    })

    const Registration = async () =>{
        const validReg = ValidationChecker(regPocket);
        if (validReg.isValid) {
            await fetch("/api/user/reg", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(regPocket)
            }).then(res => res.json()).then(data => {
                console.log(data)

            })
        }
    }

    return(
        <div className = "container">
            <form onSubmit={e=>{e.preventDefault(); Registration();}}>
                <input type="text" onChange={e=>{setRegPocket(prevState => ({...prevState, firstName: e.target.value}))}}/>
                <input type="text" onChange={e=>{setRegPocket(prevState => ({...prevState, lastName: e.target.value}))}}/>
                <input type="text" onChange={e=>{setRegPocket(prevState => ({...prevState, email: e.target.value}))}}/>
                <input type="date" onChange={e=>{setRegPocket(prevState => ({...prevState, dateOfBirth: e.target.value}))}}/>
                <input type="text" onChange={e=>{setRegPocket(prevState => ({...prevState, gender: e.target.value}))}}/>
                <input type="text" onChange={e=>{setRegPocket(prevState => ({...prevState, username: e.target.value}))}}/>
                <input type="password" onChange={e=>{setRegPocket(prevState => ({...prevState, password: e.target.value}))}}/>
                <input type="password" onChange={e=>{setRegPocket(prevState => ({...prevState, confirmPassword: e.target.value}))}}/>
                <button>Submit</button>
                <Link to='/auth'>Auth</Link>
            </form>
        </div>
    )
}