// store/reducers.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  usuario: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsuario: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const { setToken, setUsuario } = appSlice.actions;

export default appSlice.reducer;
