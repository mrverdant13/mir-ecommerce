import {
    PRODUCTO_LISTAR,
    GRUPO_PRODUCTO_LISTAR,
    CATEGORIAS_GRUPOS,
    ORDER_LIST
    
} from './ProductoTypes';

const ProductoReducer = (state = { }, action) => {

    switch (action.type) {
        case PRODUCTO_LISTAR: 
            // return {loading: true, products:{}}
            
        case GRUPO_PRODUCTO_LISTAR: 

        case CATEGORIAS_GRUPOS:

        case ORDER_LIST:
            // return {loading: true, products:{}}
        default: {
			return action;
		}
    }
};

export default ProductoReducer;
// export const productListReducer = (state = {products:[]},action)=>{
//     switch(action.type){
//         case PRODUCTO_LISTAR:
//             return {loading:true,products:[]};
//     default:
//         return state;
//     }

// }