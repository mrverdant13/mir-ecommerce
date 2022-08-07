import {
    PRODUCTO_LISTAR,
    
} from './ProductoTypes';

const ProductoReducer = (state = {products:{}}, action) => {

    switch (action.type) {
        case PRODUCTO_LISTAR: 
            return {loading: true, products:{}}
            
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