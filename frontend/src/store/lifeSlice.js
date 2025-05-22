import { createSlice } from '@reduxjs/toolkit';

const WEEKS_IN_YEAR = 52;

const initialState = {
  age: 28,
  lifeExpectancy: 80,
  weeks: [],
};

const lifeSlice = createSlice({
  name: 'life',
  initialState,
  reducers: {
    setWeeks: (state, action) => {
      state.weeks = action.payload;
    },
    setLifeExpectancy: (state, action) => {
      state.lifeExpectancy = action.payload;
    },
  },
});

export const { setWeeks, setLifeExpectancy } = lifeSlice.actions;

export default lifeSlice.reducer;
