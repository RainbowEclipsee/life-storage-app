import { configureStore } from '@reduxjs/toolkit';
import lifeReducer from './lifeSlice';
import profileReducer from './profileSlice';
import weekDetailsReducer from './weekDetailsSlice'

export const store = configureStore({
  reducer: {
    life: lifeReducer,
    profile: profileReducer,
    weekDetails: weekDetailsReducer
  },
});

export default store;
