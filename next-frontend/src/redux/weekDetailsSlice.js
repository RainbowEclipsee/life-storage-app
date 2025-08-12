import { createSlice } from '@reduxjs/toolkit';

const loadWeekDetails = () => {
  if (typeof window !== 'undefined') {
    try {
      const json = localStorage.getItem('weekDetails');
      return json ? JSON.parse(json) : {};
    } catch {
      return {};
    }
  }
  return {};
};

const saveWeekDetails = (state) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('weekDetails', JSON.stringify(state));
  }
};

const weekDetailsSlice = createSlice({
  name: 'weekDetails',
  initialState: loadWeekDetails(),
  reducers: {
    setWeekData: (state, action) => {
      const { startDate, data } = action.payload;
      const hasContent = Object.values(data.days).some(
        (d) => (d.note && d.note.trim()) || d.mood != null
      );
      if (hasContent) {
        state[startDate] = data;
      } else {
        delete state[startDate];
      }
      saveWeekDetails(state);
    },
  },
});

export const { setWeekData } = weekDetailsSlice.actions;
export const selectWeekData = (state, startDate) => state.weekDetails[startDate] || null;
export default weekDetailsSlice.reducer;
