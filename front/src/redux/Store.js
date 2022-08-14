import {configureStore} from '@reduxjs/toolkit'

import productoReducer from './productos/ProductoReducer'


const store = configureStore(
    {
        reducer:{
            productoReducer  
        }
    });

    export default store;
// const reducer = combineReducers({
//     productList:productListReducer
// })
// const initialState = {}

// const middleware = [thunk]

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// )

// export default store;