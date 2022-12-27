import {ADD_JOB, REMOVE_JOB, SET_JOB} from './constants'

export const setJob = payload =>{
    return {
        type: SET_JOB,
        payload
    }
}

export const addJob = payload =>{
    return {
        type: ADD_JOB,
        payload
    }
}

export const deleteJob = payload =>{
    return {
        type: REMOVE_JOB,
        payload
    }
}