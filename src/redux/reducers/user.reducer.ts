import { CLEAR_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constance"


export const userReducer = (state: {}, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                user: {}
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case LOAD_USER_FAIL:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: ""
            }
        default: return { ...state }
    }
}