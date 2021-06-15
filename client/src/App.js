import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import React, {useEffect} from 'react'
import './App.css';
import Login from './components/login';
import Buses from  './components/Bus';
import Rutas from './components/Rutas';
import Inicio from './components/inicio';
import Routing from './router'
import 'bootswatch/dist/darkly/bootstrap.css';
import Usuario from './components/Usuario';

function App() {

  let path = window.location.pathname;

  useEffect(() => {
    path = window.location.pathname;
  }, [])

  return (
    <>
      <Router>
        {
          path === "/" ?
            <Route exact path="/" component={Login}/>
          :
          <div>
            <Routing />
            <Switch>
              <Route exact path="/app" component={Inicio}/>
              <Route exact path="/app/rutas" component={Rutas}/>
              <Route exact path="/app/buses" component={Buses}/>
              <Route exact path="/app/usuario" component={Usuario}/>
            </Switch>
          </div>
        }
      </Router>
    </>
  );
}


export default App;
