import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import type { RootState } from '../../app/store'
import ICall from '../../interfaces/callInterface'

interface CallState {
  call: ICall
  loading: boolean
  error: string | null
  successUpdate: boolean
}

const initialState: CallState = {
  call: {} as ICall,
  loading: false,
  error: null,
  successUpdate: false,
}

export const getCall = createAsyncThunk(
  'calls/getCallDetails',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://aircall-job.herokuapp.com/activities/${id}`
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

export const updateCall = createAsyncThunk(
  'calls/updateCall',
  async (isArchived: boolean, { getState, rejectWithValue }) => {
    const { call: callState } = getState() as any
    const { call } = callState

    try {
      await axios.post(
        `https://aircall-job.herokuapp.com/activities/${call.id}`,
        {
          is_archived: isArchived,
        }
      )
    } catch (err: any) {
      let error: AxiosError<any> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    successUpdateReset: (state) => {
      state.successUpdate = false
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CALL
      .addCase(getCall.pending, (state) => {
        state.loading = true
      })
      .addCase(getCall.fulfilled, (state, action) => {
        state.loading = false
        state.call = action.payload
        state.error = null
        localStorage.setItem('call', JSON.stringify(state))
      })
      .addCase(getCall.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
        state.loading = false
        state.call = {} as ICall
      })

      // UPDATE CALL
      .addCase(updateCall.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCall.fulfilled, (state, action) => {
        state.successUpdate = true
        state.loading = false
      })
      .addCase(updateCall.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = action.error.message
        }
        state.loading = false
      })
  },
})

export const initialCallState = callSlice.getInitialState()
export const selectCall = (state: RootState) => state.call
export const { successUpdateReset } = callSlice.actions

export default callSlice.reducer
