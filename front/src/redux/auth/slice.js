import {createSlice} from '@reduxjs/toolkit'


const initialiasedState = {token:null}

export const authSlice = createSlice({
  name: 'auth',
  initialState:initialiasedState,
  reducers : {
    setToken : (state,action) => {
      return {...state,token:action.payload}
    },
    reset : () => initialiasedState
  }
})



// setUser pas nécessaire (intialeState user en object et pas tableaux)

//dispatch(reset)