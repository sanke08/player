import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constance"
import axios from "axios"

export const loginAction = ({ email, password }: { email: string, password: any }) => async (dispatch: any) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const { data } = await axios.post("/api/user/auth/login", { email, password })
        console.log(data)
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error: any) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })

    }
}
export const registerAction = ({ email, password, name }: { email: string, password: string, name: string }) => async (dispatch: any) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        const { data } = await axios.post("/api/user/auth/register", { email, password, name })
        dispatch({ type: REGISTER_SUCCESS, payload: data.user })
    } catch (error: any) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message })

    }
}

export const loadUser = ({ token }: { token: any }) => async (dispatch: any) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get("/api/user/auth/me")
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error: any) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
} 
