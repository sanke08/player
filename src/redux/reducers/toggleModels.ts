import { CLOSE_LOGIN_MODAL, CLOSE_MOBILE_TOGGLE, CLOSE_REGISTER_MODAL, CLOSE_UPLOAD_FILE_MODAL, OPEN_LOGIN_MODAL, OPEN_MOBILE_TOGGLE, OPEN_REGISTER_MODAL, OPEN_UPLOAD_FILE_MODAL } from "../constance"

const initial = {
    openLogin: false,
    openRegister: false,
    openUpload: false,
    openMobile:false,
}

export const toggleModelReducer = (state = initial, action: any) => {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                openLogin: true
            }
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                openLogin: false
            }
        case OPEN_REGISTER_MODAL:
            return {
                ...state,
                openRegister: true
            }
        case CLOSE_REGISTER_MODAL:
            return {
                ...state,
                openRegister: false
            }
        case OPEN_UPLOAD_FILE_MODAL:
            return {
                ...state,
                openUpload: true
            }
        case CLOSE_UPLOAD_FILE_MODAL:
            return {
                ...state,
                openUpload: false
            }
        case OPEN_MOBILE_TOGGLE:
            return {
                ...state,
                openMobile: true
            }
        case CLOSE_MOBILE_TOGGLE:
            return {
                ...state,
                openMobile: false
            }
        default: return { ...state }
    }
}