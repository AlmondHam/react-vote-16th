import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Router from 'next/router';

const initialState = {
  joinData: [],
  id: [],
  error: '',
  loading: false,
};

export const signUpDb = createAsyncThunk(
  'post/signup',
  async ({ joinData }: any) => {
    try {
      const response = await axios.post(
        `https://www.ceosvote.link/accounts/signup/`,
        joinData
      );
      alert('가입 성공');
      Router.push('/');
      return response.data;
    } catch (error: any) {
      console.log(error.code);
      alert('다시 입력해주세요');
      return error.code;
    }
  }
);

const joinSlice = createSlice({
  name: 'joinData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //회원정보 전송
    builder.addCase(signUpDb.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpDb.fulfilled, (state, action) => {
      state.loading = false;
      state.joinData = action.payload;
      state.error = '';
    });
    builder.addCase(signUpDb.rejected, (state, action) => {
      state.loading = false;
      state.joinData = [];
      //state.error = action.error.message;
    });
  },
});

export { joinSlice };

export const joinReducer = joinSlice.reducer;
