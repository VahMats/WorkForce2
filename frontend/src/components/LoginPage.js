import React, {useState} from "react";
import ValidationChecker from "../ValidationChecker";
import {Link} from "react-router-dom";

export default ()=>{
    const [authPocket, setAuthPocket] = useState({username:"", password:""})

    const Login = async () =>{
        const validAuth = ValidationChecker(authPocket, "login");
        if (validAuth.isValid) {
            await fetch('/api/user/auth', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(authPocket)
            }).then(res => res.json()).then(data => {
                console.log(data)
                if (data.data.length !== 0){
                    localStorage.setItem("token", data.token);
                    window.location.reload();
                }
            })
        }else return;
    }

    return(
        <div>
            <form onSubmit={e=>{e.preventDefault(); Login()}}>
                <input type="text" onChange={e=>{setAuthPocket(prev=>({...prev, username: e.target.value}))}}/>
                <input type="password" onChange={e=>{setAuthPocket(prev=>({...prev, password: e.target.value}))}}/>
                <button>Submit</button>
                <Link to='/reg'>Reg</Link>
            </form>
        </div>
    )
}