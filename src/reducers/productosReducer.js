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

// cada reducer tiene su propio state

const initialState = {
    productos:[],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
};

export default function(state= initialState, action){
    switch(action.type){

        case COMENZAR_PRODUCTO_EDITAR:
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
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoEditar: action.payload

            };

        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                loading: false,
                productoEditar: null,
                productos : state.productos.map(producto =>
                    producto.id === action.payload.id ? producto = action.payload :
                    producto
                )
            }

        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                productoEditar:null,
                error: action.payload
            };

        default:
            return state;
    }
}