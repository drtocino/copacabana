import {useState,useEffect} from 'react';
import axios from 'axios';
import {FiTrash,FiEdit} from 'react-icons/fi';

const Lugar = () => {

    const [lugares, setLugares] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/listaLugares').then((response) => {
            setLugares(response.data);
        });
    }, [])

    return (
        <div className="container rounded bg-white text-dark mt-3 p-3">
            <h1 className="text-center">Lista de Lugares</h1>
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
                                        <button className="btn text-info border-0 bg-transparent" ><FiEdit className="m-0" size={22} /></button>
                                        <button className="btn text-danger border-0 bg-transparent" ><FiTrash size={22} /></button>
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