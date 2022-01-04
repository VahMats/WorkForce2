import './App.css';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login"

function App() {
  return (

    <div className="App">
        <Router>
          <Switch>
            <Route path="/auth">
              {localStorage.token ? <Redirect to='/' /> :  <Login />}
            </Route>
            <Route path='/'>
              {localStorage.token ? <Home /> : <Redirect to='/auth' />}
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
