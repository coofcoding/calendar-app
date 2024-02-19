import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined
}

const authSlice = createSlice({
  name: second,
  initialState,
  reducers: {
    checking: ( state ) => {
        state.status = 'checking';
        state.user = {};
        state.errorMessage = undefined;
    },
    onLogin: ( state, { payload } ) => {
        state.status = 'authenticated';
        state.user = payload;
        state.errorMessage = undefined;
    },

  }
});

export const { checking, onLogin } = authSlice.actions

export default authSlice.reducer