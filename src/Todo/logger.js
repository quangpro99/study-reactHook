
function logger(reducer){
    //Nhận state và action theo hàm reducer
    return (prestate, action) => {
        //action type là set add, delete
        console.log(action.type)
        console.log('pre state:', action)
        console.log('action:', action)
        //return ở hàm reducer là new state
        const newState = reducer(prestate, action)

        console.log('next state:', newState)

        console.groupEnd()

        return newState
    }
}

export default logger