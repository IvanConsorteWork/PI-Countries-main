import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}></Route>
        <Route path = '/home' component = {Home}></Route>
      </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
