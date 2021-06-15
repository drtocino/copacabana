import React,{useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {FiTrash,FiEdit} from 'react-icons/fi';
//import EditBus from './EditBus'
//import Modal from 'react-modal';
//import 'sweetalert2/src/sweetalert2.scss'
//import Swal from 'sweetalert2/dist/sweetalert2.js'
//import { Link } from "react-router-dom";

const Buses = () => {
    
    const [buses,setBuses] = useState ([])
    const [placa,setPlaca] = useState ('')
    const [tipoBus,setTipoBus] = useState ('')
    const [idBus,setIdBus] = useState ('')
    const [idTipoBus,setIdTipoBus] = useState ('')
    const [actualizar,setActualizar] = useState (false)
    const crear = () => {
        swal.fire({
        title : 'Crear Bus',
        /*input : 'text',
        inputLabel : 'Placa',
        inputPlaceholder : 'ingrese placa de bus', */
        html: '<div>Placa<input class="form-control" id="placa" /> '+
              '</div>'+
              '<select class="select" id="tipoBus">'+
              '<option value="1">Leito</option>'+
              '<option value="2">Cama</option>'+
              '<option value="3">Nomal</option>'+
              '</select>',
        focusConfirm : false,
        preConfirm : () =>{
            setPlaca ( document.getElementById('placa').value)
            setTipoBus ( document.getElementById('tipoBus').value)
            axios.post('http://localhost:3001/RegistrarBus',{
                tipoBus : document.getElementById('placa').value,
                placa : document.getElementById('tipoBus').value,    
            })
            .then ((response)=>{
                console.log(response.data.message)
            })
            return [
              
            ]
        }
        })
        
    }
  

    const enviarDatos =() => {
        console.log(placa + ' ' + tipoBus)
        axios.post('http://localhost:3001/RegistrarBus',{
            tipoBus : tipoBus,
            placa : placa,    
        })
        .then ((response)=>{
            console.log(response.data.message)
        })
        setBuses([...buses],{
            idBus : 10,
            idTipoBus :tipoBus,
            placa : placa,
        });
    };
    const onDelete = (idBus) => {
      console.log (idBus)
      swal.fire({
        title: 'Esta Seguro?',
        text: 'No podra recuperar el archivo!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'si, Eliminar!',
        cancelButtonText: 'No, Eliminar'
      }).then((result) => {
        if (result.value) {
          sendDelete(idBus)
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire(
            'Cancelar',
            'Su archivo esta a salvo :)',
            'error'
          )
        }
      })
    };
   const sendDelete = (idBus) =>{
      // url de backend
      //const baseUrl = "http://localhost:3001/delete/:idBus"    // parameter data post
      // network
      axios.delete(`http://localhost:3001/delete/${idBus}`)
      .then(response =>{
        console.log (response.data)
        if (response.data.affectedRows) {
          swal.fire(
            'Eliminardo!',
            'Tu Bus Fue Eliminado.',
            'Exitoso'
          )
          //this.loadEmployee()
        }
      })
      .catch ( error => {
        alert("Error 325 ")
      })
    }
     useEffect(() => {
        axios.get('http://localhost:3001/listaBus').then((response) => {
          setBuses(response.data);
          console.log(response.data)
        });
      },[]);

      const abrirActualizar = ()  => {
        axios.get('http://localhost:3001/UpdateBus').then((response) => {
          setBuses(response.data);
        });
      }
      
      
      const sendUpdate = () =>{

        // get parameter id
        //let userId = this.props.match.params.id;
        // url de backend
        //axios.update(`http://localhost:3001/UpdateBus`)
        // parameter data post
        const datapost = {
          idTipoBus: idTipoBus,
          placa: placa,
          idBus :idBus,
        }
    
        axios.put(`http://localhost:3001/UpdateBus`,datapost)
        .then(response => {
          if (response.data) {
            
          }
          else {
            alert("Error")
          }
        })
        .catch ( error => {
          alert("Error 325 ")

        })
    
      }
      
      return (
        <div className="container rounded bg-white text-dark mt-3 p-3">
        <button onClick={crear} className="btn btn-primary float-end">Nuevo Bus</button>
        <h1 className="text-center">Buses</h1>
        <table className="table table-hover table-striped table-white table-sm">
          <thead className="thead-dark bg-dark text-white">
            <tr>
              <th>Tipo Bus </th>
              <th>Placa</th>
              <th className="w-25"></th>
            </tr>
                  
          </thead>
          <tbody>
            { 
                buses.map((val)=>{
                    return(
                <tr className="m-0 align-middle text-dark">
                    <td>{val.nombre}</td>
                    <td>{val.placa}</td>
                    <td>
                      <div className="btn-group float-end">
                        <button className="btn text-info border-0 bg-transparent" onClick={() =>{setActualizar(true);setIdBus(val.idBus);setIdTipoBus(val.idTipoBus);setPlaca(val.placa)}}><FiEdit size={22}/></button>
                        <button className="btn text-danger border-0 bg-transparent" onClick={() => onDelete(val.idBus)}><FiTrash size={22}/> </button>
                      </div>
                    </td>
                </tr>
                )
                })
             

                }
          </tbody>
        </table>
          <button onClick={enviarDatos} className="btn btn-info">Confirmar</button>
        {actualizar === true ? 
          <div>
            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label >Tipo Bus</label>
                <input type="text" className="form-control"  placeholder="tipoBus"
                  value={idTipoBus} onChange={(value)=> setIdTipoBus(value.target.value)}/>
              </div>
              <div class="form-group col-md-6">
                <label >placa</label>
                <input type="text" className="form-control"  placeholder="Email"
                  value={placa} onChange={(value)=> setPlaca(value.target.value)}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>sendUpdate()}>Update</button>
          </div>
          :
          "actualizar"
        }

        </div> 
      );

    
}

  
export default Buses;
