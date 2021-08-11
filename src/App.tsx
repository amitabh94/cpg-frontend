import Header from "./Header";
import Dashboard from "./DashboardContent/DashboardContent";
import SettingsContent from "./SettingsContent/SettingsContent";
import Login from "./Login/Login"
import UsersContent from "./UsersContent/UsersContent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Children } from "react";
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/Login">
              <Login />
          </Route>
          <Route path="/Dashboard">
            <Dashboard/>
          </Route>
          <Route path="/Users">
            <UsersContent />
          </Route>
          <Route path="/Settings">
            <SettingsContent />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;