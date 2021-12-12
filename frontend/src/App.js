import './App.css';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegPage from "./components/RegPage";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/auth">
              {localStorage.token ? <Redirect to='/' /> : <LoginPage  />}
            </Route>
            <Route path="/reg">
              <RegPage />
            </Route>
            <Route path='/'>
              {localStorage.token ? <MainPage /> : <Redirect to='/auth' />}
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
