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

export const createDate = (payload) => {
    return {
        type: ACTION_SATE,
        payload
    }
}

export const createTcicks = (payload) => {
    return {
        type: ACTION_TICKES,
        payload
    }
}

export const createSeleted = (payload) => {
    return {
        type: IS_SHOW_SELETED,
        payload
    }
}

export const createdTickets = (payload = []) => {
    return {
        type: TICKET,
        payload
    }
}
export const createdPerson = (payload) => {
    return {
        type: PERSON,
        payload
    }
}
export const createdChild = (payload) => {
    return {
        type: CHILD,
        payload
    }
}



