import axios from 'axios'
import {createAction, handleAction, handleActions} from 'redux-actions'
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { getCookie,setCookie } from '../util/cookie';
import api from "../api";
import Router from 'next/router';

//Action
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";



//initialState
const initialState ={
    token:"",
    error:"",
    loginDb:[],
    loading:false,
};

//Action Creator
const logOut = createAction(LOG_OUT, (user:any)=>({user}));
const setUser = createAction(SET_USER,(user:any)=>({user}));
const getUser = createAction(GET_USER, (user:any) =>({user}));

export const loginDb = createAsyncThunk('post/loginDb',
async({navigate, data}:any)=>{
    try{
        
        console.log(data);
        const res = await axios.post(`https://www.ceosvote.link/accounts/login/`,
        data
        );
        console.log(res);
        const accessToken = res.data.data.access_token;
        console.log(accessToken);
        setCookie("is_login",`${accessToken}`);
        alert("환영");
        //console.log(document.cookie);
        if(accessToken !== undefined)
        {
            Router.push("/blank");
        }
        return res.data.data.access_token
    } catch(error:any){
        alert("잘못된 아이디 또는 비번");
        return error.code;
    }
   
}
)
const loginSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // 회원정보 전송시
      builder.addCase(loginDb.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(loginDb.fulfilled, (state, action) => {
        state.loading = false;
        state.loginDb = action.payload;
        //state에 토큰저장
        state.error = "";
      });
      //!rejected시 처리 어떻게 해야할까
      builder.addCase(loginDb.rejected, (state, action) => {
        state.loading = false;
        state.loginDb = [];
        //state.error = action.message;
      });
    },
  });

export {loginSlice};
export const loginReducer = loginSlice.reducer;