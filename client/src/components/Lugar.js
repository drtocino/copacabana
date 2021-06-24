import {useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert2'
import {FiTrash,FiEdit} from 'react-icons/fi';

const Lugar = () => {

    const [lugares, setLugares] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/listaLugares').then((response) => {
            setLugares(response.data);
        });
    }, [])


    const nuevaLugar = () => {
        swal.fire({
            title: 'Nueva Lugar',
            html:
            '<div class="needs-validation" >'+
            
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="precio" class="col-sm-5 col-form-label">Departamento</label>'+
                '<div class="col-sm-7" >'+
                    '<div class="input-group">'+
                        '<div class="input-group-prepend"></span></div>'+
                        '<input id="departamento" class="form-control" required/>'+
                    '</div>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="precio-val">Ingresa nombre departamento.</div>'+
                '</div>'+

                '<label for="precio" class="col-sm-5 col-form-label">Nombre Terminal</label>'+
                '<div class="col-sm-7" >'+
                    '<div class="input-group">'+
                        '<div class="input-group-prepend"></span></div>'+
                        '<input id="terminal" class="form-control" required/>'+
                    '</div>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="precio-val">Ingresa nombre terminal.</div>'+
                '</div>'+

            '</div>'+
            '</div>'
            ,
           
            confirmButtonText: 'Guardar',
            confirmButtonColor: '#00bc8c',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            width: '60%',
            preConfirm: () => {
                
                var departamento = document.getElementById('departamento');
                var terminal = document.getElementById('terminal');
                if(!departamento.value || !terminal.value){

                    
                    return false;
                }else{
                    axios.post('http://localhost:3001/RegistrarLugar',{
                     departamento:departamento.value,
                     terminal:terminal.value,

                    }).then((response) => {
                        swal.fire({
                            title: 'Registrado',
                            icon: 'success',
                            html: 'Se completo el registro satisfactoriamente!'
                        })
                        axios.get('http://localhost:3001/listaLugares').then((response) => {
                            setLugares(response.data);
                        });
                    })
                }
            },
            reverseButtons: true
        }).then((res) => {
        })
    }


    const editarLugar = (idLugar,lugar,terminal) => {
        swal.fire({
            title: 'Nueva Lugar',
            html:
            '<div class="needs-validation" >'+
            
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="precio" class="col-sm-5 col-form-label">Departamento</label>'+
                '<div class="col-sm-7" >'+
                    '<div class="input-group">'+
                        '<div class="input-group-prepend"></span></div>'+
                        '<input id="departamento" class="form-control" value="'+lugar+'" required/>'+
                    '</div>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="precio-val">Ingresa nombre departamento.</div>'+
                '</div>'+

                '<label for="precio" class="col-sm-5 col-form-label">Nombre Terminal</label>'+
                '<div class="col-sm-7" >'+
                    '<div class="input-group">'+
                        '<div class="input-group-prepend"></span></div>'+
                        '<input id="terminal" class="form-control" value="'+terminal+'" required/>'+
                    '</div>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="precio-val">Ingresa nombre terminal.</div>'+
                '</div>'+

            '</div>'+
            '</div>'
            ,
           
            confirmButtonText: 'Guardar',
            confirmButtonColor: '#00bc8c',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            width: '60%',
            preConfirm: () => {
                
                var departamento = document.getElementById('departamento');
                var terminal = document.getElementById('terminal');
                if(!departamento.value || !terminal.value){

                    
                    return false;
                }else{
                    axios.put('http://localhost:3001/EditarLugar',{
                     id:idLugar,
                     departamento:departamento.value,
                     terminal:terminal.value,

                    }).then((response) => {
                        swal.fire({
                            title: 'Registrado',
                            icon: 'success',
                            html: 'Se completo el registro satisfactoriamente!'
                        })
                        axios.get('http://localhost:3001/listaLugares').then((response) => {
                            setLugares(response.data);
                        });
                    })
                }
            },
            reverseButtons: true
        }).then((res) => {
        })
    }

    const eliminarLugar = (idLugar,nombreTerminal) => {
        swal.fire({
            title: 'Eliminar Lugar',
            icon: 'warning',
            html: 'Seguro que desea eliminar: '+nombreTerminal+'?',
            confirmButtonColor: '#f54242',
            confirmButtonText: 'Si, elminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((response) => {
            console.log(response)
            if(response.isConfirmed){
                axios.put('http://localhost:3001/eliminarLugar',{
                id: idLugar,
            }).then(() => {
                swal.fire({
                    title: 'Eliminado',
                    icon: 'success',
                    html: 'Se elimino la lugar con exito'
                })
                axios.get('http://localhost:3001/listaLugares').then((response) => {
                    setLugares(response.data);
                });
            })

            }else{
                return 0
            }
            
        });
    }

    return (
        <div className="container rounded bg-white text-dark mt-3 p-3">
            <h1 className="text-center">Lista de Lugares
            <button className="btn btn-primary btn-sm float-end mb-3" onClick={nuevaLugar}>Nueva Lugar</button>
            </h1>
            <div className="table-responsive">
                <table className="table table-hover table-striped table-white table-sm">
                    <thead className="thead-dark bg-dark text-white">
                        <tr>
                            <td>Departamento</td>
                            <td>Nombre de Terminal</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                    {lugares.map((val) => {
                        return (
                            <tr className="m-0 align-middle text-dark">
                                <td>{val.nombre}</td>
                                <td>{val.nombreTerminal}</td>
                                <td>
                                    <div className="btn-group float-end">
                                        <button className="btn text-info border-0 bg-transparent" onClick={()=>editarLugar(val.idLugar,val.nombre,val.nombreTerminal)} ><FiEdit className="m-0" size={22} /></button>
                                        <button className="btn text-danger border-0 bg-transparent" onClick={()=>eliminarLugar(val.idLugar,val.nombreTerminal)} ><FiTrash size={22} /></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Lugar;