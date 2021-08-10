import Header from "./Header";
import Dashboard from "./DashboardContent/DashboardContent";
import SettingsContent from "./SettingsContent/SettingsContent";
import UsersContent from "./UsersContent/UsersContent";
import Login from "./Login/Login"
import UsersContent from "./UsersContent/UsersContent";
import Login from "./Login/Login"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Children } from "react";
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/Dashboard">
            <Dashboard/>
          </Route>
          <Route path="/Users">
            <UsersContent />
          </Route>
          <Route path="/Settings">
            <SettingsContent />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;