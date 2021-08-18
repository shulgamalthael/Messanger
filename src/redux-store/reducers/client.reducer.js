import { SET_CLIENT_DATA, SET_CURRENT_USER, SET_IS_LOGIN, SET_LOGINNED_USER, SET_LOGIN, SET_PASSWORD } from "../actions/client.actions"

const logUser = JSON.parse(localStorage.getItem("login")) || ""
const isLogin = JSON.parse(localStorage.getItem("isLogin")) || false;

const initialState = {
    clientData: [],
    isLogin: isLogin ,
    loginnedUser: logUser,
    currentUser: logUser,
    login: "",
    password: "",
}

export const clientReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case SET_LOGIN:
            return {
                ...state,
                login: action.payload.login,
            }
        case SET_PASSWORD: 
            return {
                ...state,
                password: action.payload.password,
            }
        case SET_IS_LOGIN:
            localStorage.setItem( "isLogin", JSON.stringify(action.payload.res) )
            const isLog = JSON.parse(localStorage.getItem("isLogin"))
            return {
                ...state,
                isLogin: isLog,
            }
        case SET_CLIENT_DATA:
            return {
                ...state,
                clientData: action.payload.clientData,
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
            }
        case SET_LOGINNED_USER:
            localStorage.setItem( "login", JSON.stringify(action.payload.loginnedUser) )
            const loginnedUser = JSON.parse(localStorage.getItem("login"))
            return {
                ...state,
                loginnedUser: loginnedUser,
            }
        default: return state
    }
}