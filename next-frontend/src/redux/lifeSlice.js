import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weeks: [],
};

const lifeSlice = createSlice({
  name: 'life',
  initialState,
  reducers: {
    setWeeks: (state, action) => {
      state.weeks = action.payload;
    },
  },
});

export const { setWeeks } = lifeSlice.actions;
export default lifeSlice.reducer;