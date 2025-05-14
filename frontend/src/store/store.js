import { configureStore } from '@reduxjs/toolkit';
import lifeReducer from './lifeSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    life: lifeReducer,
    profile: profileReducer,
  },
});

export default store;
