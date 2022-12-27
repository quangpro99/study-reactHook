import {SET_TODO_INPUT, ADD_TODO} from './constants'

const initialState = {
    // todo là mảng để chứa tất cả các jobs
    todos: [],
    //todoInput là mảng dc thêm vào khi nhập công việc còn sau khi thêm nó nằm ở todo
    todoInput: [],
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TODO_INPUT:
            return {
               ...state,
               todoInput: action.payload,
            }
        case ADD_TODO:
            return {
              ...state,
              todos: [...state.todos, action.payload]
            }
        default:
            throw new Error('Invalid action')
    }
}

export {initialState}
export default reducer