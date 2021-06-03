import React from 'react';
import {NavLink} from 'react-router-dom';

const ruteo = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink exact to="/app">
                    <div className="navbar-brand">Copacabana</div>
                </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink to="/app/rutas" className="nav-item">
                        <div className="nav-link active" aria-current="page">Rutas</div>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/app/buses" className="nav-item">
                        <div className="nav-link">Buses</div>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" >Usuarios</div>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
    //<Route path="/app/rutas" render={(props) => <Rutas/>}></Route>
}

export default ruteo;
