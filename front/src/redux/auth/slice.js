import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: [],
  },
  reducers : {
    setUser: (state,action) => {
       return {...state,user:action.payload}
    },
    setToken : (state,action) => {
      return {...state,token:action.payload}
    }
  }
})


// export const authThunk = createAsyncThunk('auth/authThunk',async (payload) => {

   
// })