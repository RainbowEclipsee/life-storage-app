import { createSlice } from '@reduxjs/toolkit'

const loadWeekDetails = () => {
  try {
    const json = localStorage.getItem('weekDetails')
    return json ? JSON.parse(json) : {}
  } catch {
    return {}
  }
}

const saveWeekDetails = (state) => {
  localStorage.setItem('weekDetails', JSON.stringify(state))
}

const weekDetailsSlice = createSlice({
  name: 'weekDetails',
  initialState: loadWeekDetails(),
  reducers: {
    // полностью перезаписывает данные недели
    setWeekData: (state, action) => {
      const { startDate, data } = action.payload
      // если есть хотя бы одна заполненная ячейка — сохраняем, иначе удаляем
      const hasContent = Object.values(data.days).some((d) => (d.note && d.note.trim()) || d.mood != null)
      if (hasContent) {
        state[startDate] = data
      } else {
        delete state[startDate]
      }
      saveWeekDetails(state)
    },
  },
})

export const { setWeekData } = weekDetailsSlice.actions
export const selectWeekData = (state, startDate) => state.weekDetails[startDate] || null
export default weekDetailsSlice.reducer
