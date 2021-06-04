import React, { Fragment, useEffect } from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {obtenerProductosAction} from  '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

     // acceder al state del store
     const cargando = useSelector(state=> state.productos.loading);
     const error = useSelector(state=> state.productos.error);
     const productos = useSelector(state=> state.productos.productos);

    useEffect(()=>{
        const cargarProductors = () => dispatch(obtenerProductosAction());

        cargarProductors();

    },[])
    return (
       <Fragment>
           <h2 className='text-center my-5'>
               Listado de Productos
           </h2>
           { error ? <p className="font-weight-bold alert alert-danger text-center">Hubo un error</p> : null}
           {cargando ? <p className='text-center'>Cargando...</p> : null}
           <table className='table table-striped'>
               <thead className='bg-primary table-dark'>
                   <tr>
                       <th scope='col'>Nombre</th>
                       <th scope='col'>Precio</th>
                       <th scope='col'>Acciones</th>
                   </tr>
               </thead>
               <tbody>
                   { productos.length ===0 ? 'No hay productos' : (
                       productos.map(producto => (
                           <Producto
                            key={producto.id}
                            producto={producto}
                           />
                       ))
                   )}

               </tbody>
           </table>
       </Fragment>
    );
};

export default Productos;