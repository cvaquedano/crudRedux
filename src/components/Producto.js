import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import {useDispatch} from 'react-redux';
import {eliminarProductoAction} from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();

    const confirmarEliminarProducto = id =>{

        Swal.fire({
            title:'Estas seguro de eliminar?',
            text:'No podras reversar esta accion!',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Si, borrarlo!'
        }).then((result)=>{
            if(result.value){

                dispatch(eliminarProductoAction(id));
            }
        });

    }
    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> ${precio}</span></td>
            <td className="acciones">
                <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
                    Editat
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Producto;