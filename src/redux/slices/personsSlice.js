import { createSlice } from '@reduxjs/toolkit'
const s = createSlice({ name:'persons', initialState:{ searchResult:null, recentSearches:[], loading:false, searchType:'NIDA' },
  reducers:{ setResult:(s,a)=>{s.searchResult=a.payload}, setSearchType:(s,a)=>{s.searchType=a.payload}, setLoading:(s,a)=>{s.loading=a.payload}, addRecent:(s,a)=>{s.recentSearches.unshift(a.payload);if(s.recentSearches.length>10)s.recentSearches.pop()} }})
export const {setResult,setSearchType,setLoading,addRecent}=s.actions; export default s.reducer
