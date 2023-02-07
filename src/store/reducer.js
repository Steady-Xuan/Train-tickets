import { combineReducers } from 'redux';
import {
    ADD_COUNT,
    SUB_COUNT,
    IS_START,
    IS_END,
    START,
    END
} from './constants';

// 定义一个状态
let initialState = {
    count: 666,
    isStart: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COUNT:
            return { count: state.count + action.num };

        case SUB_COUNT:
            return { count: state.count - action.num }

        default:
            return state
    }

}

const isStartReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_START:
            return { isStart: true };

        case IS_END:
            return { isStart: false }

        default:
            return state
    }

}


let dataTrick = {
    start: "北京",
    end: '上海'
}
const dataTrickRducer = (state = dataTrick, action) => {
    switch (action.type) {
        case START:
            return { start: action.payload, end: state.end }
        case END:
            return { end: action.payload, start: state.start }
        default:
            return state
    }
}



export default combineReducers({
    reducer,
    isStartReducer,
    dataTrickRducer
})
