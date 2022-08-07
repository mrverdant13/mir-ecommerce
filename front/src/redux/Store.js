import {  combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import  productListReducer  from './productos/ProductoReducer'


export default createStore (
    combineReducers({
        productListReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)
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