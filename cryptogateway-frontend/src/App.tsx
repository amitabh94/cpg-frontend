import Header from "./Header";
import Dashboard from "./DashboardContent/DashboardContent";
import Users from "./UserContent/UserContent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>

          <Route path="/Users">
            <Users />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;