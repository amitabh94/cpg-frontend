import Header from "./Header";
import Dashboard from "./DashboardContent/DashboardContent";
import SettingsContent from "./SettingsContent/SettingsContent";
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
          <Route path="/Settings">
            <SettingsContent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;