import {
    ADD_COUNT,
    SUB_COUNT,
    IS_START,
    IS_END,
    START,
    END
} from './constants';

export const addAction = (num) => {
    return {
        type: ADD_COUNT,
        num
    }
}

export const subAction = (num) => {
    return {
        type: SUB_COUNT,
        num
    }
}
export const getIsStart = (payload) => {
    return {
        type: IS_START,
        payload
    }
}
export const getIsEnd = (payload) => {
    return {
        type: IS_END,
        payload
    }
}

export const startAction = (payload) => {
    return {
        type: START,
        payload
    }
}

export const endAction = (payload) => {
    return {
        type: END,
        payload
    }
}


