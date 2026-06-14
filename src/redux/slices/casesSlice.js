import { createSlice } from '@reduxjs/toolkit'
import { MOCK_CASES } from '@utils/mockData'
const s = createSlice({ name:'cases', initialState:{ items:MOCK_CASES, loading:false, filter:'all', search:'' },
  reducers:{ setFilter:(s,a)=>{s.filter=a.payload}, setSearch:(s,a)=>{s.search=a.payload} }})
export const {setFilter,setSearch}=s.actions; export default s.reducer
