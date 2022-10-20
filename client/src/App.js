import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from '../src/components/About/About';
import CreateActivity from '../src/components/CreateActivity/CreateActivity';
import CardDetails from './components/CardDetails/CardDetails';
import Home from '../src/components/Home/Home';
import LandingPage from '../src/components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}></Route>
        <Route path = '/about' component = {About}></Route>        
        <Route path = '/activities' component = {CreateActivity}></Route>
        <Route exact path = '/home' component = {Home}></Route>        
        <Route exact path = "/home/:id" component = {CardDetails} />
      </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
