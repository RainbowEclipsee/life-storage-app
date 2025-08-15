import { createSlice } from '@reduxjs/toolkit';

const getInitialProfile = () => {
  if (typeof window !== 'undefined') {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }
  }
  return {
    name: '',
    dateOfBirth: '',
    estimatedDeathDate: '',
    sex: '',
    country: '',
    firstUsageDate: '',
  };
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: getInitialProfile(),
  reducers: {
    setProfileData: (state, action) => {
      const { name, dateOfBirth, estimatedDeathDate, sex, country } = action.payload;
      state.name = name;
      state.dateOfBirth = dateOfBirth;
      state.estimatedDeathDate = estimatedDeathDate;
      state.sex = sex;
      state.country = country;

      if (!state.firstUsageDate) {
        const today = new Date().toISOString().split('T')[0];
        state.firstUsageDate = today;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('profile', JSON.stringify(state));
      }
    },
    clearProfile: (state) => {
      state.name = '';
      state.dateOfBirth = '';
      state.estimatedDeathDate = '';
      state.sex = '';
      state.country = '';
      state.firstUsageDate = '';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('profile');
      }
    },
  },
});

export const { setProfileData, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
