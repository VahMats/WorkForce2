import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegPage from "./components/RegPage";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/auth">
              <LoginPage  />
            </Route>
            <Route path="/reg">
              <RegPage />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
