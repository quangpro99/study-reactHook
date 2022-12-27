import {ADD_JOB, REMOVE_JOB, SET_JOB} from './constants'

export const initState = {
    job: '',
    jobs: []
}

const reducer = (state, action) => {

    switch(action.type) {
        case SET_JOB:
            return {
                //bảo lưu các dữ liệu cũ
                ...state,
                //dữ liệu khi ấn
                job: action.payload
            }
            //break ra return
        case ADD_JOB:
            return {
                //bảo lưu các dữ liệu cũ
                ...state,
                //dữ liệu khi ấn
                // job: '',
                jobs:[...state.jobs, action.payload]
            }
        case REMOVE_JOB:
            //Tránh đi sửa mảng cũ nên ms tạo ra mảng mới, nên lúc sửa chỉ sửa thằng copy của state là newJob
            const newJobs = [...state.jobs]

            newJobs.splice(action.payload, 1)

            return {
                ...state,
                jobs: newJobs
            }
        default:
            throw new Error(`Invalid action ${action.type}`)
    }
}

export default reducer