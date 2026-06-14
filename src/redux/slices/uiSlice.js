import { createSlice } from '@reduxjs/toolkit'
const s = createSlice({ name:'ui', initialState:{ sidebarOpen:true, lang:'sw', toast:null },
  reducers:{ toggleSidebar:(s)=>{s.sidebarOpen=!s.sidebarOpen}, setLang:(s,a)=>{s.lang=a.payload}, showToast:(s,a)=>{s.toast=a.payload}, clearToast:(s)=>{s.toast=null} }})
export const {toggleSidebar,setLang,showToast,clearToast}=s.actions; export default s.reducer
