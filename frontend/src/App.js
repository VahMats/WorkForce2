import './App.css';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login"

function App() {
  return (

    <div className="App">
        <Router>
          <Switch>
            <Route path="/auth">
              {localStorage.token ? <Redirect to='/' /> :  <Login />}
            </Route>
            {/*<Route path="/reg">*/}
            {/*  <RegPage />*/}
            {/*</Route>*/}
            <Route path='/'>
              {localStorage.token ? <UserProfile /> : <Redirect to='/auth' />}
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
