import axios from 'axios';
import {
    PRODUCTO_LISTAR,
    GRUPO_PRODUCTO_LISTAR,
    CATEGORIAS_GRUPOS,
    ORDER_LIST
} from './ProductoTypes';


export const listarProductos = () => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        
        
        return dispatch({
            type: PRODUCTO_LISTAR,
            status: response.status,
            productos: response.data
           
        })
    } catch (error) {
        return dispatch(" ESTA FALLANDO");
    }
}

export const listarGrupoProductos = () => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/groups`);
        
        
        return dispatch({
            type: GRUPO_PRODUCTO_LISTAR,
            status: response.status,
            grupoProductos: response.data
           
        })
    } catch (error) {
        return dispatch(" ESTA FALLANDO");
    }
}

export const categoriaGrupo = (id) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/groups/${id}/categories`);
        
        
        return dispatch({
            type: CATEGORIAS_GRUPOS,
            status: response.status,
            grupoProductos: response.data
           
        })
    } catch (error) {
        return dispatch(" ESTA FALLANDO");
    }
}

export const listaOrder = (id) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/groups/${id}/categories`);
        
        
        return dispatch({
            type: ORDER_LIST,
            status: response.status,
            grupoProductos: response.data
           
        })
    } catch (error) {
        return dispatch(" ESTA FALLANDO");
    }
}

// export const detalleArea = (id) => async dispatch => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/general/area/obtener/${id}`);
    
//         return dispatch({
//             type: AREA_DETALLE,
//             status: response.status,
//             area: response.data
//         })
//     } catch (error) {
//         return dispatch(failed(AREA_ERROR, error));
//     }
// }

// export const registrarArea = (parmaData) => async dispatch => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/general/area/crear`,parmaData);
            
//         return dispatch(successful(AREA_REGISTRAR, response));
//     } catch (error) {
//         return dispatch(failed(AREA_ERROR, error));
//     }
// }

// export const actualizarArea = (parmaData, id) => async dispatch => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/api/general/area/actualizar/${id}`,parmaData);
        
//         return dispatch(successful(AREA_ACTUALIZAR, response));
//     } catch (error) {
//         return dispatch(failed(AREA_ERROR, error));
//     }
// }

// export const eliminarArea = (id) => async dispatch => {
//     try {
//         const response = await axios.delete(`${API_BASE_URL}/api/general/area/eliminar/${id}`);
    
//         return dispatch(successful(AREA_ELIMINAR, response));
//     } catch (error) {
//         return dispatch(failed(AREA_ERROR, error));
//     }
// }

// export const listarAreasPorFiltro = (parmaData) => async dispatch => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/general/area/listar/cabecera`,parmaData);
        
//         return dispatch({
//             type: AREA_PARTIDA_REGISTRAL_LISTAR_POR_FILTRO,
//             status: response.status,
//             areas: response.data
//         })    
//     } catch (error) {
//         return dispatch(failed(AREA_ERROR, error));
//     }
// }