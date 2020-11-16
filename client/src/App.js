// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import College from './components/College';
import Student from './components/Student'
import Error from './components/Error'


function App() {
  return (
    <div >
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/college/:collegId" component={College} />
        <Route exact path="/college/:collegeId/:studentId" component={Student} />

        <Route  path="*" component={Error} />
      </Switch>
    </Router>
     
    </div>
  );
}

export default App;
