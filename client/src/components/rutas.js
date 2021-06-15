import React,{useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert2'
import {FiTrash,FiEdit} from 'react-icons/fi';
//import BusLogo from './bus.svg'

const Rutas = () => {
    
    const [rutas, setRutas] = useState([]);
    const [lugares, setLugares] = useState([]);
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.1.10:3001/listaRutas').then((response) => {
            setRutas(response.data);
        });
        axios.get('http://192.168.1.10:3001/listaLugares').then((response) => {
            setLugares(response.data);
        });
        axios.get('http://192.168.1.10:3001/listaBus').then((response) => {
            setBuses(response.data);
        });
    }, [])

    const nuevaRuta = () => {
        swal.fire({
            title: 'Nueva Ruta',
            html:
            '<div class="needs-validation" >'+
            '<div class="form-group row mb-3" >'+
                '<label for="salida" class="col-sm-5 col-form-label text-left">Lugar de Salida</label>'+
                '<div class="col-sm-7" >'+
                    '<select id="salida" class="form-control"></select>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mb-3" >'+
                '<label for="destino" class="col-sm-5 col-form-label text-left">Lugar de Destino</label>'+
                '<div class="col-sm-7" >'+
                    '<select id="destino" class="form-control"></select>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="partida" class="col-sm-5 col-form-label">Fecha y hora de partida</label>'+
                '<div class="col-sm-7" >'+
                    '<input id="partida" type="datetime-local" class="form-control"/>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="partida-val">Selecciona una fecha por favor.</div>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="llegada" class="col-sm-5 col-form-label">Fecha y hora de llegada</label>'+
                '<div class="col-sm-7" >'+
                    '<input id="llegada" type="datetime-local" class="form-control" required/>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="llegada-val">Selecciona una fecha por favor.</div>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="bus" class="col-sm-5 col-form-label">Bus</label>'+
                '<div class="col-sm-7" >'+
                    '<select id="bus" class="form-control"></select>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="precio" class="col-sm-5 col-form-label">Precio</label>'+
                '<div class="col-sm-7" >'+
                    '<div class="input-group">'+
                        '<div class="input-group-prepend"><span class="input-group-text bg-white text-dark" id="bs">Bs</span></div>'+
                        '<input id="precio" class="form-control" required/>'+
                    '</div>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="precio-val">Ingresa un precio valido por favor.</div>'+
                '</div>'+

            '</div>'+
            '</div>'
            ,
            didOpen: () => {
                var salida = document.getElementById('salida');
                var destino = document.getElementById('destino');
                var bus = document.getElementById('bus');
                lugares.map((val) => {
                    var optSal = document.createElement('option')
                    var optDes = document.createElement('option')
                    optSal.appendChild(document.createTextNode(val.nombre+" ("+val.nombreTerminal+")"))
                    optDes.appendChild(document.createTextNode(val.nombre+" ("+val.nombreTerminal+")"))
                    optSal.value = val.idLugar
                    optDes.value = val.idLugar
                    salida.appendChild(optSal)
                    destino.appendChild(optDes)
                })
                buses.map((val) => {
                    var option = document.createElement('option')
                    option.appendChild(document.createTextNode(val.nombre+ " - " + val.placa))
                    option.value = val.idBus
                    bus.appendChild(option)
                })
            },
            confirmButtonText: 'Guardar',
            confirmButtonColor: '#00bc8c',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            width: '60%',
            preConfirm: () => {
                var partida = document.getElementById('partida');
                var llegada = document.getElementById('llegada');
                var precio = document.getElementById('precio');
                var salida = document.getElementById('salida');
                var destino = document.getElementById('destino');
                var bus = document.getElementById('bus');
                var partidaVal = document.getElementById('partida-val');
                var llegadaVal = document.getElementById('llegada-val');
                var precioVal = document.getElementById('precio-val');
                if(!precio.value || !llegada.value || !partida.value){
                    if(!partida.value){
                        partida.style.borderColor = "#f54242";
                        partida.style.boxShadow = "0 0 0 .25rem #f5424259";
                        partidaVal.style.display = "block";
                        partida.focus();
                    }
                    if(!llegada.value){
                        llegada.style.borderColor = "#f54242";
                        llegada.style.boxShadow = "0 0 0 .25rem #f5424259";
                        llegadaVal.style.display = "block";
                        llegada.focus();
                    }
                    if (!precio.value){
                        precio.style.borderColor = "#f54242";
                        precio.style.boxShadow = "0 0 0 .25rem #f5424259";
                        precioVal.style.display = "block";
                        precio.focus();
                    }
                    return false;
                }else{
                    axios.post('http://192.168.1.10:3001/RegistrarRuta',{
                        partida: partida.value,
                        llegada: llegada.value,
                        salida: salida.value,
                        destino: destino.value,
                        precio: precio.value,
                        bus: bus.value,
                    }).then((response) => {
                        swal.fire({
                            title: 'Registrado',
                            icon: 'success',
                            html: 'Se completo el registro satisfactoriamente!'
                        })
                        axios.get('http://192.168.1.10:3001/listaRutas').then((response) => {
                            setRutas(response.data);
                        });
                    })
                }
            },
            reverseButtons: true
        }).then((res) => {
        })
    }

    const editarRuta = (id,sal,des,partida,llegada,bus,precio) => {
        console.log(partida)
        swal.fire({
            title: 'Editar Ruta',
            html:
            '<div class="needs-validation" >'+
            '<div class="form-group row mb-3" >'+
                '<label for="salida" class="col-sm-5 col-form-label text-left">Lugar de Salida</label>'+
                '<div class="col-sm-7" >'+
                    '<select id="salida" class="form-control"></select>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mb-3" >'+
                '<label for="destino" class="col-sm-5 col-form-label text-left">Lugar de Destino</label>'+
                '<div class="col-sm-7" >'+
                    '<select id="destino" class="form-control"></select>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="partida" class="col-sm-5 col-form-label">Fecha y hora de partida</label>'+
                '<div class="col-sm-7" >'+
                    '<input id="partida" type="datetime-local" value="'+partida+'" class="form-control"/>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="partida-val">Selecciona una fecha por favor.</div>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="llegada" class="col-sm-5 col-form-label">Fecha y hora de llegada</label>'+
                '<div class="col-sm-7" >'+
                    '<input id="llegada" type="datetime-local" value="'+llegada+'" class="form-control" required/>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" id="llegada-val">Selecciona una fecha por favor.</div>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="bus" class="col-sm-5 col-form-label">Bus</label>'+
                '<div class="col-sm-7" >'+
                    '<select id="bus" class="form-control"></select>'+
                '</div>'+
            '</div>'+
            '<div class="form-group row mt-3" >'+
                '<label for="precio" class="col-sm-5 col-form-label">Precio</label>'+
                '<div class="col-sm-7" >'+
                    '<div class="input-group">'+
                        '<div class="input-group-prepend"><span class="input-group-text bg-white text-dark" id="bs">Bs</span></div>'+
                        '<input id="precio" class="form-control" value="'+precio+'" required/>'+
                    '</div>'+
                    '<div class="invalid-feedback position-absolute w-50 mt-0" " id="precio-val">Ingresa un precio valido por favor.</div>'+
                '</div>'+

            '</div>'+
            '</div>'
            ,
            width: '60%',
            confirmButtonText: 'Guardar',
            confirmButtonColor: '#00bc8c',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            didOpen: () => {
                var salida = document.getElementById('salida');
                var destino = document.getElementById('destino');
                var bus = document.getElementById('bus');
                lugares.map((val) => {
                    var optSal = document.createElement('option')
                    var optDes = document.createElement('option')
                    optSal.appendChild(document.createTextNode(val.nombre+" ("+val.nombreTerminal+")"))
                    console.log(sal +" "+val.idLugar)
                    if(sal == val.idLugar)
                        optSal.defaultSelected = true
                    optDes.appendChild(document.createTextNode(val.nombre+" ("+val.nombreTerminal+")"))
                    optSal.value = val.idLugar
                    optDes.value = val.idLugar
                    salida.appendChild(optSal)
                    destino.appendChild(optDes)
                })
                buses.map((val) => {
                    var option = document.createElement('option')
                    option.appendChild(document.createTextNode(val.nombre+ " - " + val.placa))
                    option.value = val.idBus
                    bus.appendChild(option)
                })
            },
        })
    }

    const eliminarRuta = () => {
        swal.fire({
            title: 'Eliminar Ruta',
            icon: 'warning',
            html: 'Seguro que desea eliminar esta ruta?',
            confirmButtonColor: '#f54242',
            confirmButtonText: 'Si, elminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then(() => {

        });
    }
    
    return (
        <div className="container rounded bg-white text-dark mt-3 p-3">
            <h1 className="text-center">Rutas
            <button className="btn btn-primary btn-sm float-end mb-3" onClick={nuevaRuta}>Nueva Ruta</button>
            </h1>
            <table className="table table-hover table-striped table-white table-sm">
                <thead className="thead-dark bg-dark text-white">
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
                    var par = new Date(val.partida)
                    var lle = new Date(val.llegada)
                    var part = String(par.getDate()).padStart(2,'0') + "/" + (String(par.getMonth() + 1).padStart(2,'0')) + "/" + par.getFullYear() + " " + par.getHours() + ":" + par.getMinutes() + ":" + par.getSeconds();
                    var start = par.getFullYear() + "-" + String(par.getMonth() + 1).padStart(2,'0') + "-" + String(par.getDate()).padStart(2,'0') + "T" + String(par.getHours()).padStart(2,'0') + ":" + String(par.getMinutes()).padStart(2,'0')
                    var lleg = String(lle.getDate()).padStart(2,'0') + "/" + (String(lle.getMonth() + 1).padStart(2,'0')) + "/" + lle.getFullYear() + " " + lle.getHours() + ":" + lle.getMinutes() + ":" + lle.getSeconds();
                    var end = lle.getFullYear() + "-" + String(lle.getMonth() + 1).padStart(2,'0') + "-" + String(lle.getDate()).padStart(2,'0') + "T" + String(lle.getHours()).padStart(2,'0') + ":" + String(lle.getMinutes()).padStart(2,'0')
                    return (
                        <tr key={val.idRuta} className="m-0 align-middle text-dark">
                            <td>{val.salida}</td>
                            <td>{val.destino}</td>
                            <td>{part}</td>
                            <td>{lleg}</td>
                            <td>{val.tipoBus}</td>
                            <td>{val.precio}</td>
                            <td className="">
                                <div className="btn-group float-end">
                                    <button className="btn text-info border-0 bg-transparent" onClick={() => editarRuta(val.idRuta,val.salida,val.destino,start,end,val.bus,val.precio)}><FiEdit className="m-0" size={22} /></button>
                                    <button className="btn text-danger border-0 bg-transparent" onClick={() => eliminarRuta()}><FiTrash size={22} /></button>
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