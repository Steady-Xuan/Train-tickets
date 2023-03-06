import { combineReducers } from 'redux';
import {
    ADD_COUNT,
    SUB_COUNT,
    IS_START,
    IS_END,
    START,
    END,
    ACTION_SATE,
    ACTION_TICKES,
    IS_SHOW_SELETED,
    TICKET,
    PERSON,
    CHILD
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


const dateRducer = (state = {
    date: Date.now()
}, action) => {
    switch (action.type) {
        case ACTION_SATE:
            return {
                date: action.payload
            }
        default:
            return state
    }
}

const tickesRducer = (state = {
    data: ""
}, action) => {
    switch (action.type) {
        case ACTION_TICKES:
            return {
                data: action.payload
            }
        default:
            return state
    }
}

const isShowreducer = (state = { isshow: false }, action) => {
    switch (action.type) {
        case IS_SHOW_SELETED:
            return {
                data: action.payload
            }
        default:
            return state
    }
}
let op = []

const optionReducer = (state = op, action) => {
    const { type, payload } = action
    switch (type) {
        case TICKET:
            return payload
        case PERSON:
            return payload
        case CHILD:
            return payload
        default:
            return state
    }
}

const testReducer = (state = { data: "" }, action) => {
    switch (action.type) {
        case "rrrr":
            console.log('执行了')
            return {
                data: action.payload
            }

        default:
            return state;
    }
}

const seatsRducer = (state = "商务座", action) => {

    const { type, payload } = action
    switch (type) {
        case 'seats':
            return payload
        default:
            return state
    }


}



export default combineReducers({
    reducer,
    isStartReducer,
    dataTrickRducer,
    dateRducer,
    tickesRducer,
    isShowreducer,
    optionReducer,
    testReducer,
    seatsRducer
})
