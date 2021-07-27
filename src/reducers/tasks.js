import * as types from '../constants/ActionTypes';

var generateID = () => {
    var randomstring = require("randomstring");
    return randomstring.generate(10);
}


var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((tasks, index) => {
        if (tasks.id === id) {
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var id = '';
    var index = -1;

    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: (action.task.status === 'true' || action.task.status === true) ? true : false
            };
            if (!task.id) {
                task.id = generateID();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            //hien thi tat ca cac phan tu cua state
            return [...state];

        case types.UPDATE_STATUS_TASK:
            //console.log(action);
            id = action.id;
            //console.log(id);
            index = findIndex(state, id);
            //console.log(index);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state));
            //hien thi tat ca cac phan tu cua state
            return [...state];

        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            //hien thi tat ca cac phan tu cua state
            return [...state];
        default: return state;
    }
};

export default myReducer;