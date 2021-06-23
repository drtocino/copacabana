import React from 'react';
import {NavLink} from 'react-router-dom';
import BusIcon from './bus.svg'

const Ruteo = () => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink exact to="/app" className="navbar-brand">
                    <img src={BusIcon} alt="Bus" width={22} className="mr-3"/>
                    Copacabana
                </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className={"nav-item"}>
                    <NavLink to="/app/rutas" className="nav-link">
                        Rutas
                    </NavLink>
                    </li>
                    <li className={"nav-item"}>
                    <NavLink to="/app/lugar" className="nav-link">
                        Lugares
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/buses" className="nav-link">
                        Buses
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/usuario" className="nav-link">
                        Usuarios
                    </NavLink>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
    //<Route path="/app/rutas" render={(props) => <Rutas/>}></Route>
}

export default Ruteo;
