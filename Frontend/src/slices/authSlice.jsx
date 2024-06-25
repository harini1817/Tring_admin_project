import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state,action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    clearAuth(state) {
      state.token = null;
      state.email = null;
    },
  },
});

export const { setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;
