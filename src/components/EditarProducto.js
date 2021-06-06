import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {editarProductoAction} from '../actions/productoActions';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // state local
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    const productoEditar = useSelector(state => state.productos.productoEditar);

    useEffect(()=>{
        guardarProducto(productoEditar)
    },[productoEditar]);

    // al recargar la pagina pueda que el state se pierda y de un error
    if(!producto) return null;
    const {nombre, precio} = producto;

    const submitEditarProducto = e => {
        e.preventDefault();
        dispatch(editarProductoAction(producto));

        history.push('/');
    };

    const onChangeFormulario = e =>{
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }
    return (
        <div className='row justify-content-center'>
           <div className='col-md-8'>
               <div className='card-body'>
                   <h2 className='text-center mb-4 font-weight-bold'>
                       Editar Producto
                   </h2>
                   <form
                    onSubmit={submitEditarProducto}
                   >
                       <div className='form-group'>
                           <label>Nombre Producto</label>
                           <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre Producto'
                                name='nombre'
                                value={nombre}
                                onChange={onChangeFormulario}
                            />
                            <label>Nombre Producto</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='precio Producto'
                                name='precio'
                                value={precio}
                                onChange={onChangeFormulario}
                            />
                       </div>

                       <button
                            type='submit'
                            className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                        >
                            Guardar cambios
                       </button>
                   </form>
               </div>
           </div>
       </div>
    );
};

export default EditarProducto;