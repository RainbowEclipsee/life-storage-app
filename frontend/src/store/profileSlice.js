import { createSlice } from '@reduxjs/toolkit'

const storedProfile = localStorage.getItem('profile')

const initialState = storedProfile
  ? JSON.parse(storedProfile)
  : {
      name: '',
      dateOfBirth: '',
      estimatedDeathDate: '',
      sex: '',
      country: '',
      firstUsageDate: '',
    }

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      const { name, dateOfBirth, estimatedDeathDate, sex, country } = action.payload
      state.name = name
      state.dateOfBirth = dateOfBirth
      state.estimatedDeathDate = estimatedDeathDate
      state.sex = sex
      state.country = country
      // Устанавливаем дату первого входа только если она ещё не была задана
      if (!state.firstUsageDate) {
        const today = new Date().toISOString().split('T')[0]
        state.firstUsageDate = today
      }
      // Сохраняем в localStorage
      localStorage.setItem('profile', JSON.stringify(state))
    },

    // ----- Не забыть реализовать позже в Profile
    clearProfile: (state) => {
      state.name = ''
      state.dateOfBirth = ''
      state.estimatedDeathDate = ''
      state.sex = ''
      state.country = ''
      state.firstUsageDate = ''
      localStorage.removeItem('profile')
    },
  },
})

export const { setProfileData, clearProfile } = profileSlice.actions
export default profileSlice.reducer
