import {createSlice} from '@reduxjs/toolkit'


const initialiasedState = {
userCredits:{
  firstName: '',
  lastName: '',
  email: '',
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState:initialiasedState,
  reducers : {
    setUser : (state,action) => {
      state.userCredits = action.payload;
      // return {...state,userCredits:action.payload}
    },
    updateUser : (state,action) => {
      state.userUpdates = action.payload;
      // return {...state,userUpdates:action.payload}
    },
    reset : () => initialiasedState
  }
})

