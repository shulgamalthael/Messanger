import { getUserConversation } from "../../utils/ws"

export const SET_CLIENT_DATA = "CLIENT/SET_CLIENT_DATA"
export const SET_CURRENT_USER = "CLIENT/SET_CURRENT_USER"
export const SET_IS_LOGIN = "CLIENT/SET_IS_LOGIN"
export const SET_LOGINNED_USER = "CLIENT/SET_LOGINNED/USER"
export const SET_LOGIN = "CLIENT/SET_LOGIN"
export const SET_PASSWORD = "CLIENT/SET_PASSWORD"

export const set_is_login = res => {
    return {
        type: SET_IS_LOGIN,
        payload: {
            res
        }
    }
}

export const set_login = login => {
    return {
        type: SET_LOGIN,
        payload: {
            login,
        }
    }
}

export const set_password = password => {
    return {
        type: SET_PASSWORD,
        payload: {
            password,
        }
    }
}

export const set_loginned_user = loginnedUser => {
    return {
        type: SET_LOGINNED_USER,
        payload: {
            loginnedUser
        }
    }
}

export const set_client_data = clientData => {
    return {
        type: SET_CLIENT_DATA,
        payload: {
            clientData,
        }
    }
}

export const set_current_user = currentUser => {
    return {
        type: SET_CURRENT_USER,
        payload: {
            currentUser,
        }
    }
}

export const get_client_data = () => 
    dispatch => {
        getUserConversation().then( data => dispatch(set_client_data(data)) )
    }