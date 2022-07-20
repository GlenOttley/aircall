import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { selectCalls } from '../calls/callsSlice'

interface IFilterState {
  archived: boolean | null
}

const initialState: IFilterState = {
  archived: null,
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setArchivedFilter: (state, action: PayloadAction<boolean | null>) => {
      state.archived = action.payload
    },
  },
  extraReducers: {},
})

export const selectFilters = (state: RootState) => state.filters
export const { setArchivedFilter } = filtersSlice.actions

export default filtersSlice.reducer

export const selectArchivedFilter = createSelector(
  [selectFilters],
  (filters) => filters.archived
)

export const selectFilteredCalls = createSelector(
  [selectCalls, selectArchivedFilter],
  (calls, archivedFilter) => {
    return Object.values(calls.calls).filter((call) =>
      archivedFilter !== null ? call.is_archived === archivedFilter : call
    )
  }
)
