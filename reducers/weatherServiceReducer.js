import {SEARCH_WEATHER} from '../actions/weatherServiceAction';

function weatherServiceReducer(state = initialState={weather:null}, action) {
    if (action.type === SEARCH_WEATHER) {
      return action.paylord
    }
    return state;
}

export default weatherServiceReducer;