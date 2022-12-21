import {legacy_createStore as createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import reducer from '../reducer/configstore'


export const store = createStore(
    reducer,
    {},
    applyMiddleware(thunk)
)