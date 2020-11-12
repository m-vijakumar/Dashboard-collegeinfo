// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import Error from './components/Error'


function App() {
  return (
    <div >
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/search" component={Search} />

        <Route  path="*" component={Error} />
      </Switch>
    </Router>
     
    </div>
  );
}

export default App;
