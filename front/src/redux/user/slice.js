import {createSlice} from '@reduxjs/toolkit'


const initialiasedState = {userCredits:null}

export const userSlice = createSlice({
  name: 'user',
  initialState:initialiasedState,
  reducers : {
    setUser : (state,action) => {
      return {...state,userCredits:action.payload}
    },
    updateUser : (state,action) => {
      return {...state,userUpdates:action.payload}
    },
    reset : () => initialiasedState
  }
})

