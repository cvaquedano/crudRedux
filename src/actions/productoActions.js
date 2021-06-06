import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto) {
    return async (dispatch) =>{
        dispatch(agregarProducto());

        try{
            // insertar en la api
            await clienteAxios.post('',producto);
            dispatch(agregarProductoExito(producto));

            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );

        } catch(error){
            console.log(error);
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al insertar registro'
                }
            );

        }
    }
}

const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO
});

const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = error =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

export function obtenerProductosAction(){
    return async (dispatch) =>{
        dispatch(descargaProductos());

        try{
            // insertar en la api
            const respuesta = await clienteAxios.get('');
            dispatch(descargaProductosExito(respuesta.data));

        } catch(error){
            console.log(error);
            dispatch(descargaProductosError(true));
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al obtener registros'
                }
            );

        }
    }
}

const descargaProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTO
});

const descargaProductosExito = productos =>({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: productos
});

const descargaProductosError = error =>({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: error
});

export function eliminarProductoAction(id){
    return async (dispatch) =>{

        dispatch(obtenerProductoEliminar(id));

        try{
            // borrar de la api
            await clienteAxios.delete(`/${id}`);
            dispatch(eliminarProductosExito(id));

            Swal.fire('Deleted!',
            'Registro Eliminado',
            'success'
            )

        } catch(error){
            console.log(error);
            dispatch(eliminarProductosError(true));
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Hubo un error al obtener registros'
                }
            );

        }
    }
}

const obtenerProductoEliminar = id =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductosExito = producto =>({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: producto
});

const eliminarProductosError = error =>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: error
});

export function obtenerProductoEditarAction(producto){
    return (dispatch) =>{
        dispatch(obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto());
        try {

            await clienteAxios.put(`/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
            
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError(true));
        }
    }
}

const editarProducto = () =>({

    type: COMENZAR_PRODUCTO_EDITAR

});
const editarProductoExito = producto =>({

    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = error =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: error
});