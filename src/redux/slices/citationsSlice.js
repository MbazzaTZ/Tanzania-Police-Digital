import { createSlice } from '@reduxjs/toolkit'
import { MOCK_CITATIONS } from '@utils/mockData'

const citationsSlice = createSlice({
  name: 'citations',
  initialState: {
    items:   MOCK_CITATIONS,
    loading: false,
    filter:  'all',   // 'all'|'issued'|'paid'|'unpaid'|'cancelled'
    search:  '',
  },
  reducers: {
    setFilter: (state, action) => { state.filter = action.payload },
    setSearch: (state, action) => { state.search = action.payload },
    addCitation: (state, action) => { state.items.unshift(action.payload) },
    updateCitation: (state, action) => {
      const idx = state.items.findIndex(c => c.id === action.payload.id)
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload }
    },
  },
})

export const { setFilter, setSearch, addCitation, updateCitation } = citationsSlice.actions
export default citationsSlice.reducer
