
const reducers = {
    todos: (state, action) => {
        const { type, payload } = action
        switch (type) {
            case "set":
                return payload
            case "addTodo":
                return [...state, payload]
            case "removeTodo":
                return state.filter((item) => {
                    return item.id !== payload;
                })
            case "compeleteTodo":
                return state.forEach((item) => {
                    if (payload === item.id) {
                        item.commpelete = !item.commpelete;
                    }
                })
        }
        return state
    },
    increment: (state, action) => {
        const { type } = action;
        switch (type) {
            case "addTodo":
                return state + 1
        }
        return state
    },
};

const combineReducers = (reducers) => {
    return (state, action) => {
        const check = {};
        for (const key in reducers) {
            check[key] = reducers[key](state[key], action);
        }
        return {
            ...state,
            ...check,
        };
    };
};
export default combineReducers(reducers);