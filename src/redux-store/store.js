import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { clientReducer } from './reducers/client.reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
    client: clientReducer,
})

export const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk))
);