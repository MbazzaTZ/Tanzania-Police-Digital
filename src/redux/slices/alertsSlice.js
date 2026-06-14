import { createSlice } from '@reduxjs/toolkit'
import { MOCK_ALERTS } from '@utils/mockData'
const s = createSlice({ name:'alerts', initialState:{ items:MOCK_ALERTS, unreadCount:5 },
  reducers:{ markRead:(s,a)=>{const i=s.items.find(x=>x.id===a.payload);if(i&&!i.read){i.read=true;s.unreadCount=Math.max(0,s.unreadCount-1)}} }})
export const {markRead}=s.actions; export default s.reducer
