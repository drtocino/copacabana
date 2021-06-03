import React,{useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

const Login = () => {
    let history = useHistory();
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [intentos, setIntentos] = useState(1);
    
    const [login, setLogin] = useState("");
    const [log, setLog] = useState(false);

    axios.defaults.withCredentials = true;

    const autenticacion = (e) => {
        e.preventDefault();
        if(usuario === "" || clave === ""){
            swal.fire({
                title: 'Error',
                icon: 'warning',
                html: 'El campo usuario y/o clave estan vacios',
                confirmButtonText: 'Volver a Intentar',
                confirmButtonColor: '#f39c12',
            });
        }else{
            axios.get(`http://192.168.56.1:3001/login/${usuario}&${clave}`)
            .then((response) => {
                console.log(response.data)
                if(response.data[0]){
                    alert("Correcto");
                }else{
                    setIntentos(intentos + 1)
                    if(intentos <= 3){
                        swal.fire({
                            title: 'Error',
                            icon: 'warning',
                            html: 'Usuario y/o clave incorrectos, vas '+intentos+' intentos',
                            confirmButtonText: 'Volver a Intentar',
                            confirmButtonColor: '#00bc8c',
                        });
                    }else{
                        swal.fire({
                            title: 'Error',
                            icon: 'error',
                            html: 'Se alcanzo el numero maximo de intentos espere 30 minutos para volver a intentar o converse con un administrador',
                            confirmButtonText: 'De acuerdo',
                            confirmButtonColor: '#e74c3c',
                        });
                    }
                }
            });  
        }
    }

    const verificar = (e) => {
        e.preventDefault()
        if(usuario === "" || clave === ""){
            swal.fire({
                title: 'Error',
                icon: 'warning',
                html: 'El campo usuario y/o clave estan vacios',
                confirmButtonText: 'Volver a Intentar',
                confirmButtonColor: '#f39c12',
            });
        }else{
            axios.post('http://192.168.56.1:3001/login',{
                usuario: usuario,
                clave: clave,
            }).then((response) => {
                if(response.data.message){
                    setLog(false)
                    setIntentos(intentos + 1)
                    if(intentos <= 3){
                        swal.fire({
                            title: 'Error',
                            icon: 'warning', 
                            html: 'Usuario y/o clave incorrectos, vas '+intentos+' intentos',
                            confirmButtonText: 'Volver a Intentar',
                            confirmButtonColor: '#00bc8c',
                        });
                    }else{
                        swal.fire({
                            title: 'Error',
                            icon: 'error',
                            html: 'Se alcanzo el numero maximo de intentos espere 30 minutos para volver a intentar o converse con un administrador',
                            confirmButtonText: 'De acuerdo',
                            confirmButtonColor: '#e74c3c',
                        });
                    }
                }else{
                    setLog(true)
                    if(response.data[0]){
                        setLog(true);
                        setLogin(response.data[0].usuario);
                        console.log(response.data[0])
                        console.log(login)
                    }else{
                        console.log(response.response)
                    }
                    history.push('/app')
                }
            });
        }
    }

    useEffect(() => {
        axios.get("http://192.168.56.1:3001/login").then((response) => {
            console.log(response)
        })
    }, [])

    return (
        <div>
            <h3 className="d-flex justify-content-center p-3 text-danger rounded">Inicio de Sesion</h3>
            <div className="d-flex justify-content-center text-center m-3">
            <div className="bg-white text-dark p-3 rounded">
            <form className="was-validated">
                <div className="form-group mt-3">
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Usuario</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" placeholder="Usuario" onChange={(e) => {setUsuario(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="form-group mt-3">
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Clave</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" placeholder="Clave" onChange={(e) => {setClave(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <button className="btn btn-danger mt-3" onClick={verificar}>Log In</button>
                <link to></link>
            </form>
            {log && (
                <div className="bg-success p-1">
                    Exito
                </div>
            )}
            </div>
            </div>
        </div>
    );
}

            /*<div className="form-group mt-3">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Recuerdame</label>
                </div>
            </div>*/
export default Login;