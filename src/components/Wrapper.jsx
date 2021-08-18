import React, { useState, useEffect } from "react";
import AppMessanger from './AppMessanger';
import AppLogin from './AppLogin';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoginSelector, logginedUserSelector } from '../redux-store/selectors/client.selectors';

const Wrapper = ({ loginnedUser, ws }) => {
    const [ user, setUser ] = useState(null);
    
    useEffect( () => {
        setUser(loginnedUser)
    }, [])

    return(
            <Switch>
                <Route 
                    exact path="/" 
                    render={() => <Redirect to="/login" />} 
                />
                <Route 
                    path={`/${user}/conversations/:id`}
                >
                    <AppMessanger ws={ws} />
                </Route>
                <Route path="/login">
                    <AppLogin />
                </Route>
            </Switch>
    )

}

const mapState = state => {
    return {
        loginnedUser: logginedUserSelector(state),
        isLogin: isLoginSelector(state),
    }
}

export default connect(mapState)(Wrapper);