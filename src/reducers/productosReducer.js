import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR

} from '../types';

// cada reducer tiene su propio state

const initialState = {
    productos:[],
    error: null,
    loading: false,
    productoEliminar: null
};

export default function(state= initialState, action){
    switch(action.type){

        case COMENZAR_DESCARGA_PRODUCTO:
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading:true
            };
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading:false,
                productos : [...state.productos, action.payload]
            };

        case DESCARGA_PRODUCTO_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        return {
            ...state,
            loading:false,
            error: action.payload
        };

        case DESCARGA_PRODUCTO_EXITO:
            return {
                ...state,
                loading:false,
                productos :  action.payload
            };

        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                loading: true,
                productoEliminar: action.payload
            };

        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                loading: false,
                productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar:null
            };
        case PRODUCTO_ELIMINADO_ERROR:
            return {
                ...state,
                loading: false,
                productoEliminar:null,
                error: action.payload
            };

        default:
            return state;
    }
}