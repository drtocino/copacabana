import React,{useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {FiTrash,FiEdit} from 'react-icons/fi';

const Usuario = () => {
    //const [usuario, setUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [rol, setRol] = useState("");

    const [confirmar, setConfirmar] = useState(false);

    const [confirmarEditar, setConfirmarEditar] = useState(false);




    useEffect(() => {
        //console.log("asd")
        axios.get("http://192.168.1.10:3001/listausuario").then((response) => {
            setUsuarios(response.data)
        });
        // axios.get("http://192.168.0.17:3001/listatipousuario").then((response) => {
        //     setRol(response.data)
        // });

    }, []);


    const crearUsuario = () => {
        
        swal.fire({title: "Registro de Usuarios",
        html: '<div class="row form-group mt-3">' +
        '<label for="nombre" class="col-sm-4 col-form-label">Nombre(s)</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="nombre" value="">' +
        '</div>' +
        '<label for="apellido" class="col-sm-4 col-form-label">Apellido(s)</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="apellido" value="">' +
        '</div>' +
        '<label for="user" class="col-sm-4 col-form-label">Usuario</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="user" value="">' +
        '</div>' +
        '<label for="password" class="col-sm-4 col-form-label">Contraseña</label>' +
        '<div class="col-sm-8">' +
        '<input type="password" class="form-control" id="password" value="">' +
        '</div>' +
        '<label for="rol" class="col-sm-4 col-form-label">Rol</label>' +
        '<div class="col-sm-8">' +
        '<select class="form-control" id="rol">'+
        '<option value="1">Administrador</option>'+
        '<option value="2">Secretario</option>'+
        '</select>' +
        '</div>' +
        
        '</div>',
        preConfirm: ()=>{
            // setNombre ( document.getElementById('nombre').value)
            // setApellido ( document.getElementById('apellido').value)
            // setUser ( document.getElementById('user').value)
            // setPassword ( document.getElementById('password').value)
            // setRol ( document.getElementById('rol').value)
            asignarDatos()
        }
    })
    .then((result)=>{
        if (result.isConfirmed) {
            setConfirmar(true)
        } else {
            setConfirmar(false)
        }
    }) 
    }

    const asignarDatos = () => {
        setNombre ( document.getElementById('nombre').value) 
        console.log(document.getElementById('nombre').value);
        setApellido ( document.getElementById('apellido').value)
        setUser ( document.getElementById('user').value)
        setPassword ( document.getElementById('password').value)
        setRol ( document.getElementById('rol').value)
    }

    const enviarDatos = () => {
        setConfirmar(false)
        axios.post(`http://192.168.1.10:3001/registrarusuario`, {
                nombre: nombre,
                apellido: apellido,
                user: user,
                password: password,
                rol: rol
            })
            .then((result)=>{
                console.log("Exito");
            })
    }

    const editarUsuario = (nom,user) => {
        // {usuarios.map((val)=>{
        console.log(nom)
        swal.fire({title: "Editar Registro de Usuarios",
        html: '<div class="row form-group mt-3">' +
        '<label for="nombre" class="col-sm-4 col-form-label">Nombre(s)</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="nombre" value="'+nombre+'">' +
        '</div>' +
        '<label for="apellido" class="col-sm-4 col-form-label">Apellido(s)</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="apellido" value="'+{apellido}+'">' +
        '</div>' +
        '<label for="user" class="col-sm-4 col-form-label">Usuario</label>' +
        '<div class="col-sm-8">' +
        '<input type="text" class="form-control" id="user" value="'+{user}+'">' +
        '</div>' +
        '<label for="password" class="col-sm-4 col-form-label">Contraseña</label>' +
        '<div class="col-sm-8">' +
        '<input type="password" class="form-control" id="password" value="'+{password}+'">' +
        '</div>' +
        '</div>',
        
        preConfirm: ()=>{
            // setNombre ( document.getElementById('nombre').value)
            // setApellido ( document.getElementById('apellido').value)
            // setUser ( document.getElementById('user').value)
            // setPassword ( document.getElementById('password').value)
            // setRol ( document.getElementById('rol').value)
            editarDatos()
        }
    
    })
    /////////////
// })
        ////////////////

    .then((result)=>{
        if (result.isConfirmed) {
            setConfirmarEditar(true)
        } else {
            setConfirmarEditar(false)
        }
    })
    //////////////
    // }
    ///////////////
}


        
    const editarDatos = () => {
        setNombre ( document.getElementById('nombre').value) 
        console.log(document.getElementById('nombre').value);
        setApellido ( document.getElementById('apellido').value)
        setUser ( document.getElementById('user').value)
        setPassword ( document.getElementById('password').value)
        // setRol ( document.getElementById('rol').value)
    }

    const enviarDatosEditados = (idUsuario) => {
        setConfirmarEditar(false)
        axios.post(`http://192.168.1.10:3001/editarusuario/${idUsuario}`, {
                nombre: nombre,
                apellido: apellido,
                user: user,
                password: password
            })
            .then((result)=>{
                console.log("Exito");
            })
    }


    const eliminarUsuario = (idUsuario) => {
        swal.fire({title: "¡Advertencia!",
        html: "¿Esta seguro que desea eliminar el Usuario?",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        icon: 'warning'
    })
        .then((result)=>{
            if (result.isConfirmed) {
                axios.delete(`http://192.168.1.10:3001/eliminarusuario/${idUsuario}`)

            } else {
                
            }
        })
    }

    return (
        
        <div className="container rounded bg-white text-dark mt-3 p-3">
                {confirmar ?
            enviarDatos()
            : 
            ""
        }

    {confirmarEditar ?
                enviarDatosEditados()
                : 
                ""
            }
            <button className="float-end btn btn-info" onClick={crearUsuario}>Nuevo Usuario</button>
            <h1 className="text-center">Lista de Usuarios</h1>
            <table className="table table-hover table-striped table-white table-sm">
                <thead className="thead-dark bg-dark text-white">
                <tr>
                    <td className="">Nombre Completo</td>
                    <td className="">Usuario</td>
                    <td className="w-25"></td>
                </tr>
                </thead>
                <tbody>
                {usuarios.map((val)=>{
                return(

                <tr className="m-0 align-middle text-dark">
                    <td className="">{val.nombre}</td>
                    <td className="">{val.usuario}</td>
                    <td className="">
                        <div className="btn-group float-end">
                        <button className="btn text-info border-0 bg-transparent" onClick={() => {editarUsuario(val.idUsuario,val.nombre)}}><FiEdit size={22}/></button>
                        <button className="btn text-danger border-0 bg-transparent" onClick={()=>eliminarUsuario(val.idUsuario)}><FiTrash size={22} /></button>
                        </div>
                    </td>
                </tr>
                
                )
            }
            )}
            </tbody>
            </table>
        
        </div>
        
    );
}

            /*<div className="form-group mt-3">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Recuerdame</label>
                </div>
            </div>*/
export default Usuario;