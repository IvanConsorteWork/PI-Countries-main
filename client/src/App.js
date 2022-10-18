import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from '../src/components/About/About';
import Home from '../src/components/Home/Home';
import LandingPage from '../src/components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}></Route>
        <Route path = '/about' component = {About}></Route>
        <Route path = '/home' component = {Home}></Route>
      </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
