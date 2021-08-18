import { createSelector } from 'reselect';

export const clientDataSelector = state => state.client.clientData;
export const currentUserSelector = state => state.client.currentUser;
export const logginedUserSelector = state => state.client.loginnedUser;
export const isLoginSelector = state => state.client.isLogin;
export const loginSelector = state => state.client.login;
export const passwordSelector = state => state.client.password;

export const forAuthDataSelector = createSelector(
    [ clientDataSelector, loginSelector ],
    ( clientData, login ) => clientData.find( el => el[`${login}`]),
)

export const validationAuthSelector = createSelector(
    [ forAuthDataSelector, loginSelector ],
    ( forAuthData, login ) => { 
        let validationData = {}
        if ( forAuthData !== undefined ) {
            const { id, password } = forAuthData[`${login}`];
            validationData = {
                login: id,
                password: password,
            }
        }
        return validationData;
    }
) 