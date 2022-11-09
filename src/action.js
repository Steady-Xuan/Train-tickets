export const createSet = (payload) => {
    return {
        type: "set",
        payload
    }
}
export const createAdd = (payload) => {
    return (dispatch, getState) => {
        const { todos } = getState() //函数执行一次就会调用一次这样可以保证拿到最新的值
        setTimeout(() => {
            if (!(todos.find((item) => { return item.text === payload }))) {
                dispatch({
                    type: "addTodo",
                    payload: {
                        id: Date.now(),
                        text: payload,
                        commpelete: false
                    }
                })

            } else alert("数据存在重复请检查")
        }, 3000)



    }


}
export const createRemove = (payload) => {
    return {
        type: "removeTodo",
        payload
    }
}
export const createComplete = (payload) => {
    return {
        type: "compeleteTodo",
        payload
    }
}
