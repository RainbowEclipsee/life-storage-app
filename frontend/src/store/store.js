// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import lifeReducer from './lifeSlice';

export const store = configureStore({
  reducer: {
    life: lifeReducer,
  },
});

export default store;
