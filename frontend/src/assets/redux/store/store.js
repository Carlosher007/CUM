// store/store.js

import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
