import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import type { RootState } from '../../app/store'
import ICall from '../../interfaces/callInterface'

interface CallsState {
  calls: ICall[]
  loading: boolean
  error: string | null
  successArchiveAll: boolean
  successUnarchiveAll: boolean
}

const initialState: CallsState = {
  calls: [],
  loading: false,
  error: null,
  successArchiveAll: false,
  successUnarchiveAll: false,
}

export const getCalls = createAsyncThunk(
  'calls/getCalls',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://aircall-job.herokuapp.com/activities'
      )
      return data
    } catch (err: any) {
      let error: AxiosError<any> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const archiveAll = createAsyncThunk(
  'calls/archiveAll',
  async (_, { getState, rejectWithValue }) => {
    const { calls: callsState } = getState() as any
    const { calls } = callsState
    try {
      calls.forEach(async (call: ICall) => {
        if (!call.is_archived) {
          await axios.post(
            `https://aircall-job.herokuapp.com/activities/${call.id}`,
            {
              is_archived: true,
            }
          )
        }
      })
    } catch (err: any) {
      let error: AxiosError<any> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const unarchiveAll = createAsyncThunk(
  'calls/unarchiveAll',
  async (_, { getState, rejectWithValue }) => {
    const { calls: callsState } = getState() as any
    const { calls } = callsState
    try {
      calls.forEach(async (call: ICall) => {
        if (call.is_archived) {
          await axios.post(
            `https://aircall-job.herokuapp.com/activities/${call.id}`,
            {
              is_archived: false,
            }
          )
        }
      })
    } catch (err: any) {
      let error: AxiosError<any> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    clearCalls: () => {
      localStorage.removeItem('calls')
      return initialState
    },
    successArchiveAllReset: (state) => {
      state.successArchiveAll = false
    },
    successUnarchiveAllReset: (state) => {
      state.successUnarchiveAll = false
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CALLS
      .addCase(getCalls.pending, (state) => {
        state.loading = true
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        state.loading = false
        state.calls = action.payload
        state.error = null
        localStorage.setItem('calls', JSON.stringify(state))
      })
      .addCase(getCalls.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
        state.calls = []
      })
      // ARCHIVE ALL CALLS
      .addCase(archiveAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(archiveAll.fulfilled, (state, action) => {
        state.successArchiveAll = true
        state.loading = false
      })
      .addCase(archiveAll.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
      // UNARCHIVE ALL CALLS
      // ARCHIVE ALL CALLS
      .addCase(unarchiveAll.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(unarchiveAll.fulfilled, (state, action) => {
        state.successUnarchiveAll = true
        state.loading = false
      })
      .addCase(unarchiveAll.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
  },
})

export const initialCallsState = callsSlice.getInitialState()
export const selectCalls = (state: RootState) => state.calls
export const { clearCalls, successArchiveAllReset, successUnarchiveAllReset } =
  callsSlice.actions

export default callsSlice.reducer
