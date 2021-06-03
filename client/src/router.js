import React from 'react';
import {NavLink} from 'react-router-dom';

const ruteo = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink exact to="/app">
                    <a className="navbar-brand" href>Copacabana</a>
                </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink to="/app/rutas" className="nav-item">
                        <a className="nav-link active" href aria-current="page">Rutas</a>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href>Buses</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href>Usuarios</a>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
    //<Route path="/app/rutas" render={(props) => <Rutas/>}></Route>
}

export default ruteo;
