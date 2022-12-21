import {loginSlice} from './user'
import {combineReducers,configureStore} from "@reduxjs/toolkit"
import { joinSlice } from './joinUser';

const reducer = combineReducers({
    loginSlice:loginSlice.reducer,
    joinSlice:joinSlice.reducer
})


export default reducer;