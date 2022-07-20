import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import callsReducer, { initialCallsState } from '../features/calls/callsSlice'
import callReducer, { initialCallState } from '../features/calls/callSlice'
import filtersReducer from '../features/filters/filtersSlice'

const callsFromStorage = localStorage.getItem('calls')
  ? JSON.parse(localStorage.getItem('calls') || '')
  : initialCallsState

const callFromStorage = localStorage.getItem('call')
  ? JSON.parse(localStorage.getItem('call') || '')
  : initialCallState

const initialState = {
  calls: callsFromStorage,
  call: callFromStorage,
}

export const store = configureStore({
  reducer: {
    calls: callsReducer,
    call: callReducer,
    filters: filtersReducer,
  },
  preloadedState: initialState,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
