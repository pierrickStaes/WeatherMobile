
import {combineReducers} from 'redux';
import weatherServiceReducer from './weatherServiceReducer';
//import tes reducers

const allReducers = combineReducers({data:weatherServiceReducer});

export default allReducers;