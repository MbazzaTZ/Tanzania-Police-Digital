import { configureStore } from '@reduxjs/toolkit'
import citationsReducer  from '../slices/citationsSlice'
import arrestsReducer    from '../slices/arrestsSlice'
import casesReducer      from '../slices/casesSlice'
import personsReducer    from '../slices/personsSlice'
import alertsReducer     from '../slices/alertsSlice'
import uiReducer         from '../slices/uiSlice'

export const store = configureStore({
  reducer: {
    citations: citationsReducer,
    arrests:   arrestsReducer,
    cases:     casesReducer,
    persons:   personsReducer,
    alerts:    alertsReducer,
    ui:        uiReducer,
  },
})
