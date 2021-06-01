import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import rutas from  './components/rutas';
import Buses from  './components/Bus';
import Routing from './router'
import 'bootswatch/dist/darkly/bootstrap.min.css';
//import axios from 'axios';

function App() {
  return (
    <Router>
      <Route path="/" exact render={(props) => <Login/>}/>
      <Route path="/app" exact render={(props) => <Routing/>}/>
 
      <Route path="/buses" exact render={(props) => <Buses/>}/>
    </Router>
  );
}


export default App;
