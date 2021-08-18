import React from 'react';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { set_is_login } from '../../../../redux-store/actions/client.actions';
import { isLoginSelector } from '../../../../redux-store/selectors/client.selectors';

const Header = ({ currentCompId, avatarUrl, isLogin, setIsLogin }) => {

    const handleLogout = () => {
        setIsLogin(false)
    }

    return(
        <>
            <img className="companion-avatar" src={avatarUrl} alt="Companion avatar" onClick={ () => handleLogout() } />
            <div className="companion-name">
                <p className="companion-name-text">{currentCompId}</p>
            </div>
            { !isLogin ? <Redirect to="/login" /> : null }
        </>
    )
}

const mapState = state => {
    return {
        isLogin: isLoginSelector(state),
    }
}

const mapDispatch = {
    setIsLogin: prop => set_is_login(prop),
}


export default connect( mapState, mapDispatch )( Header );