import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {useDispatch} from 'react-redux';
import {eliminarProductoAction, obtenerProductoEditarAction} from '../actions/productoActions';


const Producto = ({producto}) => {

    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory();

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

    // funcion que redirige de forma programada
    const redireccionarEdicion = producto => {

        dispatch(obtenerProductoEditarAction(producto));
        history.push(`/productos/editar/${producto.id}`);
    }
    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> ${precio}</span></td>
            <td className="acciones">
            <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
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