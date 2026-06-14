import { createSlice } from '@reduxjs/toolkit'
import { MOCK_ARRESTS } from '@utils/mockData'
const s = createSlice({ name:'arrests', initialState:{ items:MOCK_ARRESTS, loading:false, filter:'all', search:'' },
  reducers:{ setFilter:(s,a)=>{s.filter=a.payload}, setSearch:(s,a)=>{s.search=a.payload}, addArrest:(s,a)=>{s.items.unshift(a.payload)} }})
export const {setFilter,setSearch,addArrest}=s.actions; export default s.reducer
