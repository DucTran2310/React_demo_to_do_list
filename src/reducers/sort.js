import * as types from '../constants/ActionTypes';

var initialState = {
    by: 'name',
    value: 1 // 1 :tang -1 :giam
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                by: action.sort.by,
                value: action.sort.value
            }
        default:
            return state;
    }
};

export default myReducer;