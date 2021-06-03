import React,{useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert2'


const Rutas = () => {
    
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.10:3001/listaRutas').then((response) => {
            setRutas(response.data);
        });
    }, [])

    const nuevoLugar = () => {
        swal.fire({
            title: 'Nuevo Lugar',
            html:
            //'<div class="form-inline" >'+
            '<div class="form-group row mb-3" >'+
                '<label for="nombre" class="col-sm-5 col-form-label text-left">Nombre de Lugar</label>'+
                '<div class="col-sm-7" >'+
                    '<input id="nombre" class="form-control"/>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="nombreTerminal" class="col-sm-5 col-form-label">Nombre de Terminal</label>'+
                '<div class="col-sm-7" >'+
                    '<input id="nombreTerminal" class="form-control"/>'+
                '</div>'+
            '</div>'
            //'</div>'
            ,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Guardar',
            width: '60%',
        })
    }
    
    return (
        <div className="container bg-white text-dark mt-3 p-3">
            <h1 className="text-center">Rutas
            <button className="btn btn-primary btn-sm float-end mb-3" onClick={nuevoLugar}>Nuevo Lugar</button>
            </h1>
            <table className="table table-light">
                <thead>
                    <tr>
                        <td>Salida</td>
                        <td>Destino</td>
                        <td>Partida</td>
                        <td>Llegada</td>
                        <td>Bus</td>
                        <td>Precio</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {rutas.map((val) => {
                    return (
                        <tr>
                            <td>{val.salida}</td>
                            <td>{val.destino}</td>
                            <td>{val.partida}</td>
                            <td>{val.llegada}</td>
                            <td>{val.tipoBus}</td>
                            <td>{val.precio}</td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-warning">E</button>
                                    <button className="btn btn-danger">X</button>
                                </div>
                            </td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Rutas;