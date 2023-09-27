import handleCart from './handleCart'
import { combineReducers } from "redux";
import authDetailSlice from '../authDetailSlice';
const rootReducers = combineReducers({
    handleCart,
    authDetailSlice

})
export default rootReducers