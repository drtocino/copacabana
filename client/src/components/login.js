import React,{useState} from 'react';

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");

    const autenticacion = (e) => {
        e.preventDefault();
        console.log(usuario);
        console.log(clave);
    }

    return (
        <form>
            <h3 className="p-3">Autenticacion</h3>
            <div className="form-group mt-3">
                <label>Usuario</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {setUsuario(e.target.value)}}/>
            </div>

            <div className="form-group mt-3">
                <label>Clave</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {setClave(e.target.value)}}/>
            </div>

            <div className="form-group mt-3">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={autenticacion}>Submit</button>
        </form>
    );
}

export default Login;