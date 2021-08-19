import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import * as clientAcitions from "../redux-store/actions/client.actions"
import { clientDataSelector, isLoginSelector, loginSelector, passwordSelector, validationAuthSelector } from "../redux-store/selectors/client.selectors"

const AppLogin = ({ getClientData, clientData, setIsLogin, isLogin, setLoginnedUser, login, setLogin, password, setPassword, authData }) => {
    console.log(isLogin, login, password)

    const [ error, setError ] = useState("")

    const dataRefresher = () => {
        setLogin("")
        setPassword("")
    }

    const onLogin = e => {
        e.preventDefault()
        if ( clientData.length > 0 ) {
            if ( authData.login === login && authData.password === password ) {
                setLoginnedUser(login)
                setTimeout(() => setIsLogin(true), 300)
                setTimeout(() => window.location.reload(), 310)
                setError("")
            } else {
                setError("Invalid login or password!")
            }
        }
    }

    const handleChange = e => {
        const { name, value } = e.target

        name === "login"
            ? setLogin(value)
            : setPassword(value)  
    }

    useEffect( () => {
        getClientData()
    }, [login, password])

    return(
        <div className="messanger">
            <form className="login-form" onKeyDown={ e => e.keyCode === 13 ? onLogin(e): null } onSubmit={ e => onLogin(e)}>
                <label htmlFor="email">LOGIN</label>
                <input className="login-form_input" type="login" name="login" id="email" placeholder="Login" onChange={handleChange} value={login} />
                <label htmlFor="Password">PASSWORD</label>
                <input className="login-form_input" type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={password} />
                <span style={{color: "red"}}>{error}</span>
                <button className="login-form_loginbtn" type="submit">
                    Login
                </button>
                { isLogin ? <Redirect to={`${login}/conversations/Example`} /> : null }
            </form>
        </div>
    )
}

const mapState = state => {
    return {
        login: loginSelector(state),
        password: passwordSelector(state),
        isLogin: isLoginSelector(state),
        clientData: clientDataSelector(state),
        authData: validationAuthSelector(state),
    }
}

const mapDispatch = {
    setLogin: prop => clientAcitions.set_login(prop),
    setPassword: prop => clientAcitions.set_password(prop),
    setIsLogin: prop => clientAcitions.set_is_login(prop),
    setLoginnedUser: prop => clientAcitions.set_loginned_user(prop),
    getClientData: () => clientAcitions.get_client_data(),
}


export default connect( mapState, mapDispatch )( AppLogin )